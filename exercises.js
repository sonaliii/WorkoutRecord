function ExerciseControl($scope, $http) {
	$scope.exercises = [{'weight': 200, 'date': '01-May-2012'}];
		$http.get('data.tsv').success(function(data, status, headers, config) {
			if (data && status === 200) {
				var exerciseData = data.split('\n');
				console.log(exerciseData);
			}
		});
}