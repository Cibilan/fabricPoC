// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	
	$scope.queryAllTuna = function(){

		appFactory.queryAllTuna(function(data){
		
			var array = [];
			for (var i = 0; i < data.length; i++){
	
				data[i].Record.Key = data[i].Key;
				array.push(data[i].Record);
			}

			console.log(array);
			$scope.all_tuna = array;
		});
	}
});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllTuna = function(callback){

    	$http.get('/get_all_tuna/').success(function(output){
			callback(output)
		});
	}

	return factory;
});


