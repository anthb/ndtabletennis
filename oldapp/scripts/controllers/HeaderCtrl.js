'use strict';

/**
 * @ngdoc function
 * @name ndtabletennisApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ndtabletennisApp
 */
angular.module('ndtabletennisApp')
  .controller('HeaderCtrl', function ($scope, $location) {

  	$scope.isActive = function(viewLocation) {
  		return viewLocation === $location.path();
  	}


  });
