(function () {

    var app = angular.module("myApp");

    var loginController = function ($scope, $http, $cookies, $location) {
        //interactive functionality code goes here

        console.log("Login - Initializing");

        $scope.loginForm = {};
        $scope.formLoading = false;

        var onSuccess = function (response) {
            console.log('Login - Successful Response From Server');
            saveDataToCookie(response.data.data);
            
            console.log("Login - Redirecting To Newsfeed");
            $location.path('/newsfeed');
        }

        var saveDataToCookie = function (data) {
            //setup and save cookie data
            console.log('Login - Saving Data To Cookie');
            $cookies.userData = JSON.stringify(data);
        }

        var onFailure = function (response) {
            console.log('Login - Error From Server / Failure To Send');
            $scope.formLoading = false;
            alert(JSON.stringify(response));
        }


        $scope.attemptLogin = function () {
            console.log('Login - Attempting To Login');
            $scope.formLoading = true;
            var data = $scope.loginForm;
            $http.post("http://api.thunderchicken.ca/api/auth", data)
                .then(onSuccess, onFailure);
        }



    }

    app.controller("loginController", ["$scope", "$http", "$cookies", "$location",loginController]);
}());