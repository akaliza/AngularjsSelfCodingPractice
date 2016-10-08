angular.module('main')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', '$stateParams', '$translate'];

function MainController(
    $scope,
    $stateParams,
    $translate) {


    console.log('MainController....');

    if ($stateParams.language) {
        $translate.use($stateParams.language);
    }


}