(function () {

    var app = angular.module("myApp", ["ngRoute"]);

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
        .otherwise({
            redirectTo: "/login"
        });

    });

    app.controller('AppCtrl', ['$scope', function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    }]);

}());