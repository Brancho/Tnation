
var app = angular.module('test', ['ui.bootstrap','ngRoute']);

    app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/quiz.html',
        controller: 'submitController'
      }).
      when('/result', {
        templateUrl: 'templates/result.html',
        controller: 'resultController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


    app.controller('submitController', ['$scope','$http','$timeout', function($scope, $http, $timeout) {

      $http.get('podaci.json').success(function(data) {
      $scope.data = data;

      $scope.counter = $scope.data.vreme;

  });

       $scope.countdown = function() {
          $timeout(function() {
            if( $scope.counter > 0 ){
              $scope.counter--;
            }
             /*  else 
            go to the other page */
           $scope.countdown();
          }, 1000);
        };
      

      $scope.answers = [];
      $scope.text = '';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.answers.push(this.text);
          $scope.text = '';
        }
        
      };
      $scope.remove = function($index) { 
        $scope.answers.splice($index, 1);     
      }




    }]);

    app.controller('resultController', function($scope) {
 
    $scope.message = 'This is Show orders screen';
 
});




    
   



