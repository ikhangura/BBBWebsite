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

    app.controller('AppCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
        $scope.displayLoggedInOptions = false;

        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;

        });

        // route authorization
        $scope.$on('$locationChangeStart', function (event, data) {
            var hashIndex = data.indexOf('#');
            var path = data.substr(hashIndex + 1);

            if (path != "/login") {
                if ($cookies.userData == "") {
                    console.log("Authorization - Unauthorized User Detected");
                    $location.path('/login');
                }
            }
        });

        //logout functionality
        $scope.logout = function () {
            console.log("Authorization - User Logged Out / Cookie Cleared");
            $cookies.userData = "";
        }

        //menu display authorization
        $scope.$on('$viewContentLoaded', function () {
            if ($cookies.userData != "") {
                $scope.displayLoggedInOptions = true;
            } else {
                $scope.displayLoggedInOptions = false;
            }
        })
    }]);

}());