'use strict';

/**
 * @ngdoc function
 * @name ndtabletennisApp.controller:MatchCtrl
 * @description
 * # MatchCtrl
 * Controller of the ndtabletennisApp
 */
angular.module('ndtabletennisApp')
  .controller('MatchCtrl', function ($scope, $firebase, calculatePointsService) {
    
  	var fbUrl = 'https://ndtabletennis.firebaseio.com/players',
  		fbRef = new Firebase(fbUrl),
  		sync = $firebase(fbRef);

	var players = sync.$asArray(),
		participantOne,
		participantTwo;

	$scope.players = players;
	$scope.chosenPlayers = [];

	// I suspect this will not load if you have come from a page where this has been called (using sockets anyway, so need to look into how data is exchanged).
	players.$loaded()
		.then(function(playersData){


			var playersObj = angular.fromJson(angular.toJson(playersData));
		});

	$scope.addParticipation = function(number) {

		if(number === 'playerOne') {
			participantOne = $scope.playerOne;
		} else {
			participantTwo = $scope.playerTwo;
		}

		// Only set the scope for winner when both playerOne and playerTwo is set.
		if(participantOne !== undefined && participantTwo !== undefined) {
			console.log()
			$scope.chosenPlayers = [participantOne, participantTwo];
		}
	}

	 $scope.assignNewPoints = function(playerOne, playerTwo) {
		
		console.log($scope.playerOne);
		console.log($scope.playerTwo);

		if($scope.playerOne.$id === $scope.playerTwo.$id) {

			alert('Cannot select the same people');
			return;
		}
		
		console.log('winner is');
		console.log($scope.winner.name);

		// Call the calculatePointsService and pass in the arguments - playerOne, playerTwo, K value (needs to be updated to reflect match type) and winner of match
		var newPoints = calculatePointsService.calculatePoints($scope.playerOne, $scope.playerTwo, 20, $scope.winner.name);
		

		$scope.playerOne.points = newPoints[0];
		$scope.playerTwo.points = newPoints[1];

		// Update the player objects to reflect new points. Need to investigate if I need to setWithPriority or not (See below and I suspect probably not).
		// First time using noSQL so trying to get my head around how to store data. From my impression you store data as a query (sort of), instead of querying later.
		sync.$update($scope.playerOne.$id, {points: newPoints[0]});
		sync.$update($scope.playerTwo.$id, {points: newPoints[1]});

		//Set the data with priority so we can order it by points (look into later).
		//fbRef.child($scope.playerOne.$id).setWithPriority($scope.playerOne, newPoints[0]);
		//fbRef.child($scope.playerTwo.$id).setWithPriority($scope.playerTwo, newPoints[1]);
	};
  });
