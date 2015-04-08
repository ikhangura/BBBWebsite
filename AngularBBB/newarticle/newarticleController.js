(function () {

    var app = angular.module("myApp");

    var newarticleController = function($scope, $http, $cookie) {
        //interactive functionality code goes here
        $scope.formLoading = false;
        console.log("New Article - Initializing");

        //get cookie data
        var userData = JSON.parse($cookie.userData);
        alert(JSON.stringify(userData));
        var token = userData.token;
        var userid = userData.userid;

        console.log("New Article - Successfuly Pulled Cookie Data");

        var onSuccess = function(response) {
            console.log("New Article - Successful Response From Server");
            //console.log("Newsfeed: " + response.data.message);
            //alert(JSON.stringify(response));
            $scope.newsfeed = response.data.data.news;
            $scope.formLoading = false;
        }

        var onFailure = function(response) {
            console.log("New Article - Failure Response From Server / Error In Sending");
            alert(JSON.stringify(response));
            $scope.formLoading = false;
        }

        // post new article /api/newsfeed/:userid/article/:token
        //$http.post("http://api.thunderchicken.ca/" + "api/newsfeed/" + userid + "/article/" + token)
        //    .then(onSuccess, onFailure);
    }

    app.controller("newarticleController", ["$scope", "$http", "$cookies", newarticleController]);

}());