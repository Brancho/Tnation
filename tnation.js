var app = angular.module('test', ['ui.bootstrap','ngRoute','hms']);

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

app.controller('submitController', ['$scope','$http','$timeout','$location','answerService', function($scope, $http, $timeout, $location, answerService) {
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
            if ($scope.counter == 0) {
              $scope.changePage();
            }
      };

$scope.changePage = function() {
        answerService.set($scope.answers);
        $location.path( "/result" );
        $scope.counter = $scope.data.vreme;
        $timeout.cancel();
        }


$scope.answers = [];
$scope.text = '';
$scope.submit = function() {
        if ( $.inArray($scope.text, $scope.data.ponudjene) !== -1) {

           $scope.answers.push($scope.text);
        }  
        $scope.text = '';
};
      
$scope.remove = function($index) { 
           $scope.answers.splice($index, 1);     
        }
    }]);

app.controller('resultController', ['$scope','answerService','$http', function($scope, answerService, $http) {
      $scope.message = answerService.get();
      $scope.dynamic = 0;
      $http.get('podaci.json').success(function(data) {
      $scope.data = data;
      $scope.answers = answerService.get();
      $scope.correctAnswers = $scope.data.tacno;


$scope.compareArrays = function(arr1, arr2){
      var inBoth = [];
      angular.forEach(arr1, function(a1){
            angular.forEach(arr2, function(a2){
                if (a1 == a2){
                    inBoth.push(a1);
                }
            });
        });
        return inBoth.length;
    };


$scope.dynamic = ($scope.compareArrays($scope.answers, $scope.correctAnswers) / $scope.correctAnswers.length) * 100;        
});
 
}]);


app.factory('answerService', function() {
    var savedData = {}
    function set(data) {
    savedData = data;
}
  function get() {
  return savedData;
 }
 return {
  set: set,
  get: get
 }

});




    
   



