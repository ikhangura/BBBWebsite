(function() {
    var app = angular.module('board', []);

    app.controller('BoardController', function() {
        this.news = gems;
    });

    angular.module('switchExample', ['ngAnimate'])
    .controller('ExampleController', ['$scope', function ($scope) {
        $scope.items = ['list', 'article'];
        $scope.selection = $scope.items[0];
    }]);

    var gems = [
        {
            title: 'iOS Book due Jan 26',
            poster: 'DARCY DEWOLF SMITH, Web & Mobile (iOS)',
            date: '1 day ago',
            content: 'Kickstarter Pinterest lo-fi, pug fanny pack hoodie tofu gentrify yr blog Tumblr retro narwhal disrupt. Beard master cleanse whatever put a bird on it XOXO. PBR single-origin coffee cred, photo booth keytar aesthetic Etsy gluten-free crucifix blog scenester polaroid.',
            comments: [
                {
                    poster: 'Ryan Sadio',
                    content: 'OMG! Why?'
                },
                {
                    poster: 'Ben Soer',
                    content: 'OMG! Why not?'
                },
                {
                    poster: 'Alan Lai',
                    content: 'OMG! OMG?'
                },
                {
                    poster: 'Inderjeet :)',
                    content: 'OMG? OMG?'
                },
                {
                    poster: 'Matthew Banman',
                    content: 'Bow before me!'
                },
                ]
        },
        {
            title: 'iOS Book due Jan 26',
            poster: 'DARCY DEWOLF SMITH, Web & Mobile (iOS)',
            date: '1 day ago',
            content: 'Kickstarter Pinterest lo-fi, pug fanny pack hoodie tofu gentrify yr blog Tumblr retro narwhal disrupt. Beard master cleanse whatever put a bird on it XOXO. PBR single-origin coffee cred, photo booth keytar aesthetic Etsy gluten-free crucifix blog scenester polaroid.',
            comments: [
                {
                    poster: 'Ryan Sadio',
                    content: 'OMG! Why?'
                },
                {
                    poster: 'Ben Soer',
                    content: 'OMG! Why not?'
                },
                {
                    poster: 'Alan Lai',
                    content: 'OMG! OMG?'
                },
                {
                    poster: 'Inderjeet :)',
                    content: 'OMG? OMG?'
                },
                {
                    poster: 'Matthew Banman',
                    content: 'Bow before me!'
                },
            ]
        },
        {
            title: 'iOS Book due Jan 26',
            poster: 'DARCY DEWOLF SMITH, Web & Mobile (iOS)',
            date: '1 day ago',
            content: 'Kickstarter Pinterest lo-fi, pug fanny pack hoodie tofu gentrify yr blog Tumblr retro narwhal disrupt. Beard master cleanse whatever put a bird on it XOXO. PBR single-origin coffee cred, photo booth keytar aesthetic Etsy gluten-free crucifix blog scenester polaroid.',
            comments: [
                {
                    poster: 'Ryan Sadio',
                    content: 'OMG! Why?'
                },
                {
                    poster: 'Ben Soer',
                    content: 'OMG! Why not?'
                },
                {
                    poster: 'Alan Lai',
                    content: 'OMG! OMG?'
                },
                {
                    poster: 'Inderjeet :)',
                    content: 'OMG? OMG?'
                },
                {
                    poster: 'Matthew Banman',
                    content: 'Bow before me!'
                },
            ]
        }
    ];
})();
