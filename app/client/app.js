// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', ['ngMaterial','md-steppers']);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();

				$scope.stepper = {};
			$scope.stage1 = [];
			$scope.stage2 = [];
			$scope.stage3 = [];
			$scope.stage4 = [];
			$scope.stage5 = [];
			$scope.stage6 = [];
	
	$scope.queryAllCon = function(){

		appFactory.queryAllCon(function(data){
		
			var array = [];
			for (var i = 0; i < data.length; i++){
	
				data[i].Record.Key = data[i].Key;
				array.push(data[i].Record);
			}

			$scope.allcon = true;

			console.log(array);
			$scope.all_con = array;
		});
	}

	$scope.queryCon = function(){

		var id = $scope.con_id;

		appFactory.queryCon(id, function(data){
			$scope.con = data;
			$scope.con.Key = $scope.con_id;

			$scope.stepper = {
    		step1Completed : false,
    		step2Completed : false,
    		step3Completed : false,
    		step4Completed : false,
    		step5Completed : false,
    		step6Completed : false,
    		disable : false,
    		selected : 2

    		};

    		$scope.stage1 = [
	    	{
	    		"user": "User1",
			"transactionDescription": "Created Contarct",
			"timestamp": 1523336462000
	    	}

    		];

				$scope.stage2 = [
			{
				"user": "User1",
				"transactionDescription": "Upload Document",
				"timestamp": 1523336462000
			},
			{
				"user": "User1",
				"transactionDescription": "Added Parties",
				"timestamp": 1523336804000
			},
			{
				"user": "User1",
				"transactionDescription": "Added conditions",
				"timestamp": 1523336964000
			},
			{
				"user": "Smart Contarct",
				"transactionDescription": "Contarct Activated",
				"timestamp": 1523337176000
			}
			];

			$scope.stage3 = [
				{
					"user": "User1",
					"transactionDescription": "User1 Signed",
					"timestamp": 1523339582000
				},
				{
					"user": "User2",
					"transactionDescription": "User2 Signed",
					"timestamp": 1523339783000
				}
			];

			if ($scope.query_con == "Could not locate tuna"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}
});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllCon = function(callback){

    	$http.get('/get_all_con/').success(function(output){
			callback(output)
		});
	}

	factory.queryCon = function(id, callback){
    	$http.get('/get_con/'+id).success(function(output){
			callback(output)
		});
	}

	return factory;
});


