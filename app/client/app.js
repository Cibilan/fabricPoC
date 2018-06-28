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

	$scope.user = "user1";		
	
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

		$scope.stepper = {
    		step1Completed : false,
    		step2Completed : false,
    		step3Completed : false,
    		step4Completed : false,
    		step5Completed : false,
    		step6Completed : false,
    		disable : false,
    		selected : 0
    		};
    		delete $scope.con;	
    	/*	delete $scope.stage1;
    		delete $scope.stage2;
    		delete $scope.stage3;
    		delete $scope.stage4;
    		delete $scope.all_party;*/


		appFactory.queryCon(id, function(data){
			$scope.con = data;
			$scope.con.Key = $scope.con_id;

    		angular.forEach($scope.con.historylist, function(list){
				if(list.stage == "Contract Created"){
					$scope.stage1.push(list);	
				}
				if(list.stage == "Contract Activation"){
					$scope.stage2.push(list);	
				}
				if(list.stage == "Contract Signing"){
					$scope.stage3.push(list);	
				}
				if(list.stage == "Contract Validation"){
					$scope.stage4.push(list);	
				}
			})

			$scope.all_party = $scope.con.partylist;	

			if ($scope.query_con == "Could not locate tuna"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.addCon = function(){

		$scope.newCon.user = $scope.user;
		appFactory.addCon($scope.newCon, function(data){
			$scope.new_Con_Success = data;
			$("#success_create").show();
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

	factory.addCon = function(data, callback){

		var con = data.id + "-" + data.detail + "-" + data.user;

    	$http.get('/add_con/'+con).success(function(output){
			callback(output)
		});
	}

	return factory;
});


