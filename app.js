var workoutApp = angular.module("workoutApp", 
  ['ngRoute', 'ngCookies', 'workoutApp.controllers', 'workoutApp.services'])

workoutApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'layout.html'
    })
    .when('/exercises', {
      controller: 'AddExerciseController',
      templateUrl: 'layout.html'
    })
    .otherwise({
      redirectTo: '/layout.html'
    })
})

var workoutServices = angular.module('workoutApp.services', []);

workoutServices.service('AddExerciseService', function($http) {
  this.addExercise = function() {
    return $http({
      method: 'POST', // GET, POST, HEAD, PUT, DELETE
      url: '/exercises'
    });
  }
})

var exercises = {"bench press": {"February 10, 2014": {"weight": 200, "sets": 4, "reps": 4}}};

exports.AddExercise = function(data) {
  
}