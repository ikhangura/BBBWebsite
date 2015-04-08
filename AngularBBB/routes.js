(function () {

    var app = angular.module("myApp", ["ngRoute", "ngCookies", "ngAnimate"]);

    app.config(function ($routeProvider) {
        $routeProvider
          .when("/login", {
              templateUrl: "/login/loginView.html",
              controller: "loginController",
              title: "Login"
          })
        .when("/contacts", {
            templateUrl: "/contacts/contactsView.html",
            controller: "contactsController",
            title: "Contacts"
        })
        .when("/mycourses", {
            templateUrl: "/mycourses/mycoursesView.html",
            controller: "mycoursesController",
            title: "Courses"
        })
        .when("/newsfeed", {
            templateUrl: "/newsfeed/newsfeedView.html",
            controller: "newsfeedController",
            title: "Newsfeed"
        })
        .when("/article/:newsid", {
            templateUrl: "/article/articleView.html",
            controller: "articleController",
            title: "Article"
        })
        .when("/newarticle", {
            templateUrl: "/newarticle/newarticleView.html",
            controller: "newarticleController",
            title: "New Article"
        })
        .otherwise({
            redirectTo: "/login"
        });

    });

    app.controller('AppCtrl', ['$scope', '$cookies', function ($scope, $cookies) {
        $scope.displayLoggedInOptions = false;

        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });

        $scope.logout = function () {
            $cookies.userData = "";
        }


        $scope.$on('$viewContentLoaded', function () {
            console.log("HERE");
            if ($cookies.userData != "") {
                console.log("Triggered as logged in");
                $scope.displayLoggedInOptions = true;
            }
        })
    }]);

}());