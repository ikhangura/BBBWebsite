(function () {

    var app = angular.module("myApp");

    var articleController = function ($scope, $routeParams) {
        //interactive functionality code goes here
        $scope.newsid = $routeParams.newsid;



    }

    app.controller("articleController", ["$scope", "$routeParams", articleController]);
}());