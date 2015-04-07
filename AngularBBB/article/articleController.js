(function () {

    var app = angular.module("myApp");

    var articleController = function ($scope, $http, $cookie, $location, $anchorScroll, $routeParams) {
        //interactive functionality code goes here

        var newsid = $routeParams.newsid;
        var userInfo = JSON.parse($cookie.userData);
        var token = userInfo.token;
        var usertype = userInfo.type;
        var userid = userInfo.userid;
        var userrealname = userInfo.name;
        var baseURL = "http://api.thunderchicken.ca/api/";

        var Load = function () {
            var articleURL = baseURL + "newsfeed/" + userid + "/article/" + newsid + "/" + token;
            $http.get(articleURL)
            .success(function (response) {
                BindArticle(response.data);
                BindComments(response.data.comments);
            })
            .error(function (data) {
                var test = data;
            })
        };

        var BindComments = function (commentsArray) {
            $scope.comments = commentsArray;
        };

        var BindArticle = function (data) {
            $scope.articletitle = data.title;
            $scope.articleauthor = data.authorname;
            $scope.articledate = data.datetime;
            $scope.articletext = data.content;
        }

        $scope.PostNewComment = function () {

        };

        $scope.GoToTop = function () {
            $location.hash('top');
            $anchorScroll();
        }

        $scope.NavigateBack = function() {
            history.back();
        };

        Load();
    }

    app.controller("articleController", ["$scope", "$http", "$cookies", "$location", "$anchorScroll", "$routeParams", articleController]);
}());