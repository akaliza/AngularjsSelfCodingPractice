angular.module('shared')
    .service('GatewayService', GatewayService);

GatewayService.$inject = ['$http', '$q'];

function GatewayService($http, $q) {

    var apiUrl = 'http://localhost:9000/api/';

    this.callApi = function (method, path, payload) {

        var defer = $q.defer();

        $http({
            method: method,
            url: apiUrl + path,
            data: payload
        }).then(
            function successCallback(response) {
                defer.resolve(response.data);
            }, function errorCallback(err) {
                defer.reject(err);
            }
        );

        return defer.promise;

    }

}