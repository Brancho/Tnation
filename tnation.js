
var app = angular.module('test', ['ui.bootstrap']);

    app.controller('submitController', ['$scope','$http', function($scope, $http) {

      $http.get('podaci.json').success(function(data) {
      $scope.data = data;
  });

      $scope.answers = [];
      $scope.text = '';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.answers.push(this.text);
          $scope.text = '';
        }
        $scope.remove = function($index) { 
        $scope.answers.splice($index, 1);     
      }
      };



    }]);

   



