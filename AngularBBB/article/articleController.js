(function () {

    var app = angular.module("myApp");

    var articleController = function ($scope, $http, $cookie, $location, $anchorScroll, $routeParams, BASEURL) {
        //interactive functionality code goes here

        var newsid = $routeParams.newsid;
        var userInfo = JSON.parse($cookie.userData);
        var token = userInfo.token;
        var usertype = userInfo.type;
        var userid = userInfo.userid;
        var userrealname = userInfo.name;
        var baseURL = BASEURL + "/";
        var lastPage = document.referrer;

        var Load = function () {
            var articleURL = baseURL + "newsfeed/" + userid + "/article/" + newsid + "/" + token;
            $http.get(articleURL)
            .success(function (response) {
                BindArticle(response.data);
                BindComments(response.data.comments);
                $scope.dataloaded = true;
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
            var postcommentURL = baseURL + "newsfeed/" + userid + "/article/" + newsid + "/comment/" + token;
            var commentobj = new Object();
            commentobj.content = $scope.newcommenttext;
            var commentjson = JSON.stringify(commentobj);

            $http.post(postcommentURL, commentjson)
                .success(function (response) {
                    $scope.postresponse = response.message;
                    $scope.newcommenttext = '';
                    Load();
                })
                .error(function (response) {
                    $scope.postresponse = response.message;
                });
        };

        $scope.GoToTop = function () {
            $location.hash('top');
            $anchorScroll();
        }

        $scope.NavigateBack = function() {
            window.location.replace("#/newsfeed");
        };

        $scope.dataloaded = false;
        Load();
    }

    app.controller("articleController", ["$scope", "$http", "$cookies", "$location", "$anchorScroll", "$routeParams", "BASEURL",articleController]);
}());