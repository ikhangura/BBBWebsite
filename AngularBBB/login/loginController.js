(function () {

    var app = angular.module("myApp");

    var loginController = function ($scope, $http, $cookies, $location) {
        //interactive functionality code goes here

        console.log("HELLO");

        $scope.loginForm = {};

        var onSuccess = function (response) {
            console.log("in success response");
            var token = response.data.data.token;
            //alert(token);

            var userData = response.data.data;

            //alert(JSON.stringify(response.data.data));
            saveDataToCookie(response.data.data);
            
            console.log("about to location");
            $location.path('/newsfeed');

            console.log("go here");


        }

        var saveDataToCookie = function (data) {
            console.log('in function');
            //setup and save cookie data
            var expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 2);

            console.log('setting options');
            var options = { 'expires': expiryDate };

            console.log('saving cookie');
            $cookies.userData = data;
        }

        var onFailure = function (response) {
            console.log("in failure response");
            alert(JSON.stringify(response));
        }


        $scope.attemptLogin = function () {
            console.log("here")
            var data = $scope.loginForm;
            $http.post("http://api.thunderchicken.ca/api/auth", data)
                .then(onSuccess, onFailure);
        }



    }

    app.controller("loginController", ["$scope", "$http", "$cookies", "$location",loginController]);
}());