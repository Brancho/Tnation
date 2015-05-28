
var app = angular.module('test', []);

    app.controller('submitController', ['$scope', function($scope) {
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

    }]);

    app.controller('jsonController', function($scope, $http) {
          $http.get('podaci.json').success(function(data) {
    $scope.gradovi = data;
  });
    });



