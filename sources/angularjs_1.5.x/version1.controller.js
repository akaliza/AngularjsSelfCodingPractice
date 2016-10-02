angular.module('version1', [])
    .controller('Version1Controller', Version1Controller);

Version1Controller.$inject = ['$scope'];

function Version1Controller($scope) {

    console.log('Version1Controller...');

}