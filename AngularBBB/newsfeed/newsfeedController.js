(function () {

    var app = angular.module("myApp");

    var newsfeedController = function ($scope, $http, $cookie) {
        //interactive functionality code goes here

        console.log("in newsfeed controller");

        //get cookie data
        var userData = JSON.parse($cookie.userData);
        alert(JSON.stringify(userData));
        var token = userData.token;
        var userid = userData.userid;

        console.log("pulled cookie data");


        var onSuccess = function (response) {
            console.log("in success response");
            //console.log("Newsfeed: " + response.data.message);
            alert(JSON.stringify(response));
            $scope.newsfeed = response.data.data.news;
        }

        var onFailure = function (response) {
            console.log("failure");
            alert(JSON.stringify(response));
        }



        //get newsfeed data
        $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/standard/" + token)
            .then(onSuccess, onFailure);

        


    }

    app.controller("newsfeedController", ["$scope", "$http", "$cookies", newsfeedController]);
}());