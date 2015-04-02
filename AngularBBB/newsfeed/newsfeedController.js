(function () {

    var app = angular.module("myApp");

    var newsfeedController = function ($scope, $http, $cookie) {
        //interactive functionality code goes here
        $scope.formLoading = true;
        console.log("Newsfeed - Initializing");


        //get cookie data
        var userData = JSON.parse($cookie.userData);
        //alert(JSON.stringify(userData));
        var token = userData.token;
        var userid = userData.userid;

        console.log("Newsfeed - Successfuly Pulled Cookie Data");


        var onSuccess = function (response) {
            console.log("Newsfeed - Successful Response From Server");
            //console.log("Newsfeed: " + response.data.message);
            //alert(JSON.stringify(response));
            $scope.newsfeed = response.data.data.news;
            $scope.formLoading = false;
        }

        var onFailure = function (response) {
            console.log("Newsfeed - Failure Response From Server / Error In Sending");
            alert(JSON.stringify(response));
            $scope.formLoading = false;
        }



        //get newsfeed data
        $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/standard/" + token)
            .then(onSuccess, onFailure);

        


    }

    app.controller("newsfeedController", ["$scope", "$http", "$cookies", newsfeedController]);
}());