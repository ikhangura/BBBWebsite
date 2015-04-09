(function () {

    var app = angular.module("myApp");

    var newsfeedController = function ($scope, $http, $cookie) {
        //interactive functionality code goes here
        $scope.newsfeedLoading = true;
        $scope.menuLoading = true;
        $scope.transition = true;

        var AllNewsSet = true;

        console.log("Newsfeed - SignalR Initialization");

        var connection = $.hubConnection('http://api.thunderchicken.ca');
        var newsfeedHubProxy = connection.createHubProxy('newsfeedHub');

        newsfeedHubProxy.on('hello', function (message) {
            console.log(message);
        });

        newsfeedHubProxy.on("newNews", function () {
            console.log("Newsfeed - Update Request Recieved From Server");
            if (AllNewsSet) {
                console.log("Newsfeed - Client Detected Viewing All News. Now Updating");
                $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/standard/" + token)
                    .success(function (response) {
                        console.log("Newsfeed - Successfuly Updated News From Server");
                        $scope.newsfeed = response.data.news;

                    });
            } else {
                console.log("Newsfeed - Client Is Not Viewing All News. Update Aborted");
            }

        });


        connection.start().done(function () {
            console.log("SignalR - Calling Greeting");
            newsfeedHubProxy.invoke("hello");
        });

        

        


        console.log("Newsfeed - Initializing");


        //get cookie data
        var userData = JSON.parse($cookie.userData);
        //alert(JSON.stringify(userData));
        var token = userData.token;
        var userid = userData.userid;
        var name = userData.name;
        var courses;

        console.log("Newsfeed - Successfuly Pulled Cookie Data");

        $scope.username = name;


        var onSuccess = function (response) {
            $scope.transition = true;
            console.log("Newsfeed - Successful Response From Server For Newsfeed");
            //console.log("Newsfeed: " + response.data.message);
            //alert(JSON.stringify(response));
            $scope.newsfeed = response.data.data.news;
            $scope.transition = false;
            $scope.newsfeedLoading = false;
        }

        var onFailure = function (response) {
            console.log("Newsfeed - Failure Response From Server / Error In Sending For Newsfeed");
            alert("There was an Error Loading the Newsfeed. Please Refresh the Page or Re-Login");
            //alert(JSON.stringify(response));
            $scope.newsfeedLoading = false;
        }

        var onMenuSuccess = function (response) {
            console.log("Newsfeed - Success Response From Server For Menu");
            $scope.programname = response.data.data.programname;

            courses = response.data.data.courses;
            var coursesArray = response.data.data.courses;
            var allOption = coursesArray.pop(); //remove the last element
            $scope.all = allOption.coursesectionid;
            $scope.courses = coursesArray;

            $scope.menuLoading = false;
        }

        var onMenuFailure = function (response) {
            console.log("Newsfeed - Failure Response From Server / Error In Sending For Menu");
            $scope.menuLoading = false;
            alert("There was an Error Loading the Newsfeed Menu. Please Refresh the Page or Re-Login");
        }


        $scope.getCourseSpecific = function(coursesectionid){
            //alert(coursesectionid);
            if (coursesectionid == 'all') {
                AllNewsSet = true;
                // call default news fetch
                $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/standard/" + token)
                    .then(onSuccess, onFailure);
            } else {
                AllNewsSet = false;
                $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/coursesection/" + coursesectionid + "/" + token)
                    .then(onSuccess, onFailure);
            }
            
        }

        //get newsfeed data
        $http.get("http://api.thunderchicken.ca/api/newsfeed/" + userid + "/standard/" + token)
            .then(onSuccess, onFailure);

        //get course data
        $http.get("http://api.thunderchicken.ca/api/mycourses/" + userid + "/" + token)
            .then(onMenuSuccess, onMenuFailure);


    }

    app.controller("newsfeedController", ["$scope", "$http", "$cookies", newsfeedController]);
}());