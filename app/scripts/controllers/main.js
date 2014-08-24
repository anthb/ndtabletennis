'use strict';

/**
 * @ngdoc function
 * @name ndtabletennisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ndtabletennisApp
 */
angular.module('ndtabletennisApp')
    .controller('MainCtrl', function($scope, $firebase) {

        var fbUrl = 'https://ndtabletennis.firebaseio.com/players',
            fbRef = new Firebase(fbUrl),
            sync = $firebase(fbRef);

        var players = sync.$asArray();
        $scope.players = players;
        $scope.points = '-points';

    })
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        	.when('/', {
        		templateUrl: 'views/main.html',
        		controller: 'MainCtrl'
        	})
            .when('/new-match', {
                templateUrl: 'views/new-match.html',
                controller: 'MatchCtrl'
            })
            .when('/new-player', {
                templateUrl: 'views/new-player.html',
                controller: 'NewPlayerCtrl'
            }).
            otherwise({
		        redirectTo: '/'
	      	});

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });