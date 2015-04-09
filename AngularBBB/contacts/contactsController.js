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

        // Setup sidemenu
        $scope.username = userInfo.name;
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
        // get course data
        $http.get("http://api.thunderchicken.ca/api/mycourses/" + userid + "/" + token)
            .then(onMenuSuccess, onMenuFailure);

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
                $scope.singlecontactselected = true;
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
            if (typeof $scope.txtsearch == undefined || $scope.txtsearch.length <= 0) {
                DisplayAllContactsFromCache();
            } else {
                var searchterm = $scope.txtsearch.toLowerCase();
                var newlist = new Array();
                for (var i = 0; i < allcontacts.length; i++) {
                    if (allcontacts[i].name.toLowerCase().indexOf(searchterm) != -1) {
                        newlist.push(angular.copy(allcontacts[i]));
                    }
                }
                $scope.contactdata = newlist;
            }
        };

        $scope.ResetContacts = function () {
            if (typeof $scope.txtsearch != undefined) {
                $scope.txtsearch = '';
            }            
            DisplayAllContactsFromCache();
        };

        var DisplayAllContactsFromCache = function () {
            $scope.contactdata = allcontacts;
        }

        $scope.ShowContactList = function () {
            $scope.singlecontactselected = false;
        };

        $scope.singlecontactselected = false;
        LoadAllContacts();
    }

    app.controller("contactsController", ["$scope", "$http", "$cookies", "$location", "$anchorScroll", "$routeParams", contactsController]);
}());