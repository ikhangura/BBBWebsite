(function () {

    var app = angular.module("myApp");

    var loginController = function ($scope, $http, $cookies, $location, BASEURL) {
        //interactive functionality code goes here

        console.log("Login - Initializing");

        $scope.loginForm = {};
        $scope.formLoading = false;
        $scope.displayNotice = false;

        $http.get(BASEURL + "/newsfeed/critical")
            .success(function (response) {
                console.log('Login - Loading Critical News Notices');
                $scope.notices = response.data.criticalnews;
                if ($scope.notices.length > 0) {
                    $scope.displayNotice = true;
                }
                
            });

        

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
            if (response.status == 403) {
                $scope.errorMessage = "The Username / Password Entered Is Invalid";
            } else if (response.status == 500) {
                $scope.errorMessage = "An Error Has Occurred On The Server. Please Refresh The Page and Login Again";
            } else {
                $scope.errorMessage = "An Error Has Occurred On The Server. Please select Start Menu > Shutdown, And Have a Nice Day";
            }
            //$scope.errorMessage
            $scope.formLoading = false;
            //alert(JSON.stringify(response));
        }


        $scope.attemptLogin = function () {
            if ($scope.loginForm.$valid) {
                console.log('Login - Attempting To Login');
                $scope.formLoading = true;
                var data = $scope.loginForm;
                $http.post(BASEURL + "/auth", data)
                    .then(onSuccess, onFailure);
            }
            
        }



    }

    app.controller("loginController", ["$scope", "$http", "$cookies", "$location","BASEURL",loginController]);
}());