
var app = angular.module('test', ['ui.bootstrap']);

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
           $scope.countdown();
          }, 1000);

          else 
            //go to the other page
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

   



