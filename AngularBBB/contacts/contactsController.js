(function () {

    var app = angular.module("myApp");

    var contactsController = function ($scope, $http, $cookie, $location, $anchorScroll, $routeParams) {

        var userInfo = JSON.parse($cookie.userData);
        var token = userInfo.token;
        var usertype = userInfo.type;
        var userid = userInfo.userid;
        var userrealname = userInfo.name;
        var baseURL = "http://api.thunderchicken.ca/api/";
        var allcontactsURL = baseURL + "contacts/" + userid + "/" + token;
        var basesinglecontactURL = baseURL + "contacts/" + userid + "/single/";
        
        var allcontacts; // Stores all the contacts when initially received for searching through later

        var LoadAllContacts = function () {
            $http.get(allcontactsURL)
            .success(function (response) {
                allcontacts = response.data.contacts;
                $scope.contactdata = response.data.contacts;
            })
            .error(function (response) {

            });
        };

        $scope.LoadSingleContact = function(targetuserid) {
            var usercontactURL = basesinglecontactURL + targetuserid + "/" + token;
            $http.get(usercontactURL)
            .success(function (response) {
                BindSingleContactData(response.data);
            })
            .error(function (resposne) {

            });
        };

        var BindSingleContactData = function (data) {
            $scope.scname = ChangeEmptyToUnavailable(data.name);
            $scope.scdept = ChangeEmptyToUnavailable(data.department);
            $scope.scposition = ChangeEmptyToUnavailable(data.position);
            $scope.scemail = ChangeEmptyToUnavailable(data.email);
            $scope.scphone = ChangeEmptyToUnavailable(data.phone);
            $scope.scofficelocation = ChangeEmptyToUnavailable(data.officelocation);
            $scope.scmon = ChangeEmptyToUnavailable(data.officehours.monday);
            $scope.sctue = ChangeEmptyToUnavailable(data.officehours.tuesday);
            $scope.scwed = ChangeEmptyToUnavailable(data.officehours.wednesday);
            $scope.scthu = ChangeEmptyToUnavailable(data.officehours.thursday);
            $scope.scfri = ChangeEmptyToUnavailable(data.officehours.friday);
        };

        var ChangeEmptyToUnavailable = function (string) {
            if (string.length <= 0) {
                return "Unavailable";
            }
            return string;
        };

        $scope.FilterContacts = function () {

        };

        LoadAllContacts();
    }

    app.controller("contactsController", ["$scope", "$http", "$cookies", "$location", "$anchorScroll", "$routeParams", contactsController]);
}());