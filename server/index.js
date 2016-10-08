const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const file = "test.db";
const limit = 10;


// DATABASE CONFIG
const exists = fs.existsSync(file);
const typeMap = {
    string: "TEXT",
    number: "REAL",
    boolean: "INT"
};


if (!exists) {
    fs.openSync(file, "w");
}

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

/// SELECT name FROM my_db.sqlite_master WHERE type='table';
var tables = [];
//db.each("SELECT name FROM sqlite_master WHERE type = 'table'", (err, data) => {
//    tables.push(data.name);
//});

db.each("SELECT name FROM sqlite_master WHERE type = 'table'", function(err, data) {
    tables.push(data.name);});

// API CONFIGURATION
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, DELETE, PATCH, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()); // for parsing application/json
app.listen(9000, function () {
    console.log('listening on 9000')
});

app.get('/api/tables', function(req, res)  {
    res.send(tables);
});

app.get('/api/:res/:id?', function (req, res)  {
    var resource = getResourceName(req.params.res),
        id = req.params.id,
        size = req.query.limit || limit,
        page = req.query.page,
        stmt;

    if (!id) {
        var where = '';
        Object.keys(req.query).forEach(function(key) {
            if (key !== 'limit' && key !== 'page') {
                if (where.length > 0) {
                    where += ' AND ';
                } else {
                    where += ' WHERE ';
                }

                if (req.query[key].indexOf('%')!== -1) {
                    where += key + ' like ' + getValueTypeForData(req.query[key]);
                } else {
                    where += key + ' = ' + getValueTypeForData(req.query[key]);
                }

            }
        });
        stmt = 'SELECT * FROM ' + resource + ' ' + where + ' LIMIT ' + size;
        console.log(stmt);
        if (page) {
            stmt += ' OFFSET ' + (page * size);
        }
        db.all(stmt, function (err, data) {
            res.send(data);
        });
    } else {
        stmt = 'SELECT * FROM ' + resource + ' WHERE id=' + id + ';';
        db.get(stmt,function (err, data)  {
            res.send(data);
        });
    }
});

app.delete('/api/:res/:id?', function(req, res)  {
    var resource = getResourceName(req.params.res),
        id = req.params.id,
        stmt;

    if (id) {
        stmt = 'DELETE FROM ' + resource + ' WHERE id=' + id + ';';
    } else {
        stmt = 'DROP TABLE ' + resource;
    }

    db.run(stmt, function(err, data)  {
        res.send('ok');
    });
});

app.patch('/api/:res/:id', function(req, res) {
    var body = req.body,
        resource = getResourceName(req.params.res),
        id = req.params.id,
        updateValues;

    Object.keys(body).forEach(function(key)  {
        if (key !== 'id') {
            if (updateValues) {
                updateValues = updateValues
                    .concat(',')
                    .concat(key)
                    .concat('=')
                    .concat(getValueTypeForData(body[key]));
            } else {
                keys = key;
                updateValues = key
                    .concat('=')
                    .concat(getValueTypeForData(body[key]));
            }
        }
    });

    var stmt = "UPDATE " + resource + " SET  " + updateValues + " WHERE id=" + id + ";";

    db.run(stmt, function (err, data) {
        res.send('ok');
    });
});

app.put('/api/:res',function (req, res) {
    var body = req.body,
        resource = getResourceName(req.params.res);

    db.serialize(function () {
        stmt = createIfNotExists(resource, body);

        if (stmt) {
            db.run(stmt);
        }

        var run = "INSERT INTO " + resource + " VALUES (null";

        Object.keys(body).forEach(function(key)  {
            run += ',' + getValueTypeForData(body[key]);
        });

        run += ');';

        db.run(run, function(err, data)  {
            res.send(data);
        });
    });

});

function getValueTypeForData(data) {
    if (typeof data === 'string') {
        return "'" + data + "'";
    } else if (typeof data === 'boolean') {
        return data ? 1 : 0;
    } else {
        return data;
    }
}


function createIfNotExists(res, object) {
    var stmt;
    if (tables.indexOf(res) === -1) {
        stmt = "CREATE TABLE " + res + "(id INTEGER PRIMARY KEY   AUTOINCREMENT";

        Object.keys(object).forEach(function(key) {
            stmt += "," + key + " " + typeMap[typeof object[key]];
        });

        stmt += ");";
        tables.push(res);
    }

    return stmt;
}

function getResourceName(value) {
    if (value) {
        return value.toLowerCase();
    }

    return value;
}