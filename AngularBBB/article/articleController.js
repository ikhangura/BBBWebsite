(function () {

    var app = angular.module("myApp");

    var articleController = function ($scope, $http, $cookie, $routeParams) {
        //interactive functionality code goes here
        $scope.newsid = $routeParams.newsid;

        var userInfo = JSON.parse($cookie.userData);
        var token = userInfo.token;
        var usertype = userInfo.type;
        var userid = userInfo.userid;
        var userrealname = userInfo.name;

        var loadArticle = function () {

        };

        var loadComments = function () {

        }

        $scope.userinfo = "ID:" + userid + " " + userrealname + " " + usertype + " " + token;
    }

    app.controller("articleController", ["$scope", "$http", "$cookies", "$routeParams", articleController]);
}());