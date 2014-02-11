function ExerciseControl($scope, $http) {
	$scope.exercises = [];
		$http.get('data.tsv').success(function(data, status, headers, config) {
			if (data && status === 200) {
				var exerciseData = data.split('\n');
				console.log(exerciseData);
			}
		});
}