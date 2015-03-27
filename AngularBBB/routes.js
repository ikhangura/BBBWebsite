(function () {

    var app = angular.module("myApp", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
          .when("/login", {
              templateUrl: "/login/loginView.html",
              controller: "loginController"
          })
        .when("/contacts", {
            templateUrl: "/contacts/contactsView.html",
            controller: "contactsController"
        })
        .when("/mycourses", {
            templateUrl: "/mycourses/mycoursesView.html",
            controller: "mycoursesController"
        })
        .when("/newsfeed", {
            templateUrl: "/newsfeed/newsfeedView.html",
            controller: "newsfeedController"
        })
        .otherwise({
            redirectTo: "/login"
        });

    });

}());