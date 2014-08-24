'use strict';


angular.module('ndtabletennisApp')
	.factory('calculatePointsService', ['$window', function() {


// Using Football Elo rating system to determine the value
	// http://en.wikipedia.org/wiki/World_Football_Elo_Ratings#Basic_calculation_principles
	// Formula I am using is P = K( W - We)

	// P = Points Change
	// K = Weight (Type of match)
	// W = Result of the match
	// We = Expected result

	// K is 20 for friendly, 30 for Tournament and 40 for Special Tournaments


	// We calculation = 1 / (10 - ^ (dr / 400) + 1)
	// dr is the differential in points

	function We(playerOne, playerTwo) {

		var de = playerOne.points - playerTwo.points,
			exponent = de / 400,
			myWe = 1 / (Math.pow(10, (-exponent)) + 1);

			console.log( de);

			console.log(myWe);
			return myWe;
	}

	return {
		calculatePoints: function(playerOne, playerTwo, K, W) {
			
			var oldPlayerOnePoints = playerOne.points,
				oldPlayerTwoPoints = playerTwo.points,
				playerOnePointsNew,
				playerTwoPointsNew,
				pointsArray = [];

			console.log(W);
			console.log(playerTwo.name);
			console.log(playerTwo.name === W);

			if( playerOne.name === W) {

				playerOne.result = 1;
				playerTwo.result = 0;
			} else {
				playerOne.result = 0;
				playerTwo.result = 1;
			}

			playerOnePointsNew = (K * (playerOne.result - We(playerOne, playerTwo)) + oldPlayerOnePoints);
			playerTwoPointsNew = (K * (playerTwo.result - We(playerTwo, playerOne)) + oldPlayerTwoPoints);
			
			delete playerOne.result;
			delete playerTwo.result;

			pointsArray.push(playerOnePointsNew);
			pointsArray.push(playerTwoPointsNew);
			return pointsArray;
		}
	};
}]);