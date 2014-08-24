'use strict';

/**
 * @ngdoc function
 * @name ndtabletennisApp.controller:newPlayerCtrl
 * @description
 * # newPlayerCtrl
 * Controller of the ndtabletennisApp
 */
angular.module('ndtabletennisApp')
  .controller('NewPlayerCtrl', function ($scope, $firebase) {
    
  	var fbUrl = 'https://ndtabletennis.firebaseio.com/players',
  		fbRef = new Firebase(fbUrl),
  		sync = $firebase(fbRef);

	var players = sync.$asArray();
	$scope.players = players;
	$scope.points = '-points';
	$scope.playerName;
	$scope.isCreated = true;

	
	 $scope.addPlayer = function() {
		
	 	var newPlayer = fbRef.push(),
	 		name = $scope.playerName;

	 	if(name === undefined) {
	 		return;
	 	} else if (name.length < 2) {
 			alert('Enter a proper name');
 			return;
 		}

		newPlayer.setWithPriority({
			'name': name,
			'points': 400
		}, 400);
		console.log(newPlayer.toString());
		$scope.isCreated = false;
	};

	console.log($scope.isCreated);

  });
