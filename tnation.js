
var app = angular.module('test', []);

    app.controller('submitController', ['$scope','$http', function($scope, $http) {
      $scope.list = [];
      $scope.text = '';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
        $scope.remove = function($index) { 
        $scope.list.splice($index, 1);     
      }
      };

      $http.get('podaci.json').success(function(data) {
      $scope.data = data;
  });

    }]);

   



