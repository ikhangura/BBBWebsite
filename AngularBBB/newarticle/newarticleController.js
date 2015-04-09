(function () {

    var app = angular.module("myApp");

    var newarticleController = function($scope, $http, $cookie, $location) {
        //interactive functionality code goes here
        $scope.formLoading = false;
        console.log("New Article - Initializing");

        //get cookie data
        var userData = JSON.parse($cookie.userData);
//        alert(JSON.stringify(userData));
        var token = userData.token;
        var userid = userData.userid;
        var localresponse;
        var articleTitle;
        var articleCourse;
        var articleExpiry;
        var articlePriority;
        var articleContent;

        console.log("New Article - Successfuly Pulled Cookie Data");

        var onSuccess = function(response) {
            console.log("New Article - Successful Response From Server");
            console.log(JSON.stringify(response));
            localresponse = response;
            $scope.contactlist = response.data.data.coursesections;
            for (var i = 0; i < response.data.data.coursesections.length; i++) {
                if (response.data.data.coursesections[i].coursename == "ALL") {
                    $scope.allcontact = response.data.data.coursesections[i].coursesectionid;
                }
            }
        }

        var onFailure = function(response) {
            console.log("New Article - Failure Response From Server / Error In Sending");
            alert(JSON.stringify(response));
        }

        $scope.RecipientReload = function () {
            articlePriority = $scope.criticalField;
            console.log(articlePriority);
            var allcontact;
            if (articlePriority) {
                for (var i = 0; i < localresponse.data.data.coursesections.length; i++) {
                    if (localresponse.data.data.coursesections[i].coursename == "ALL") {
                        allcontact = [
                            {
                                'coursename': localresponse.data.data.coursesections[i].coursename,
                                'coursesectionid': localresponse.data.data.coursesections[i].coursesectionid
                            }
                        ];
                    } 
                }
                $scope.contactlist = allcontact;
                console.log(allcontact);
            } else {
                $scope.contactlist = localresponse.data.data.coursesections;
            }
        }

        $scope.PostArticle = function () {
            var postarticleUrl = "http://api.thunderchicken.ca/" + "api/newsfeed/" + userid + "/article/" + token;
            articleTitle = $scope.titleField;
            articleCourse = $scope.recipientField;
            articleExpiry = $scope.expiryField;
            articlePriority = $scope.criticalField;
            articleContent = $scope.contentField;
            var article = new Object();
            
            var msSqlDate = function() {
                var postDate = new Date($scope.expiryField);
                var dd = postDate.getDate();
                var mm = postDate.getMonth() + 1; //January is 0!
                var yyyy = postDate.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                postDate = yyyy + '-' + mm + '-' + dd;
                return postDate + " 23:59:59.997";
            };

            if (articleTitle != undefined && articleContent != undefined && articleCourse != undefined)
            {
                // build json object
                article.title = articleTitle;
                article.coursesectionid = articleCourse;
                article.expirydate = articleExpiry == undefined ? "9999-12-31 23:59:59.997" : msSqlDate();
                article.priority = articlePriority ? "Critical" : "Standard";
                article.content = articleContent;

                var articlejson = JSON.stringify(article);
                console.log(articlejson);

                $http.post(postarticleUrl, articlejson)
                    .success(function (response) {
                        console.log = response.message;
                        window.location.replace("#/newsfeed");
                    })
                    .error(function (response) {
                        console.log = response.message;
                    });
            }
        };

        // get postable contacts /api/contacts/:userid/postable/:token 
        $http.get("http://api.thunderchicken.ca/" + "api/contacts/" + userid + "/postable/" + token)
            .then(onSuccess, onFailure);
    }

    app.controller("newarticleController", ["$scope", "$http", "$cookies", "$location", newarticleController]);

}());