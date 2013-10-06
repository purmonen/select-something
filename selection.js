var app = angular.module('app', []);

app.controller('SelectionCtrl', function($scope, $timeout) {
	$scope.elements = [];
	$scope.selected = [];
	$scope.element = '';
	$scope.selectionSize = 0;
	$scope.showNoSelection = true;
	var allowSelect = true;

	$scope.addElement = function() {
		var element = $scope.element.trim();
		$scope.element = '';

		if (element) {
			$scope.elements.push(element);
		}

		if ($scope.elements.length === 1) {
			$scope.selectionSize = 1;
		}
	};

	$scope.removeElement = function(index) {
		$scope.selectionSize = 1;
		$scope.elements.splice(index, 1);
	}

	$scope.removeSelected = function(index) {
		$scope.selected.splice(index, 1);

		if (!$scope.selected.length) {
			$scope.showNoSelection = true;
		}
	}

	$scope.removeElements = function() {
		$scope.elements = [];
		$scope.selected = [];
		$scope.showNoSelection = true;
	}

	$scope.selectElements = function() {
		if (allowSelect) {
			allowSelect = false;
			$scope.showNoSelection = false;
			$scope.selected = [];
			select([]);
		}
	}

	function select(indexes) {
		var timeout = 500;
		if (indexes.length < $scope.selectionSize) {
			while (true) {
				random = randomRange(0, $scope.elements.length-1);
				if (indexes.indexOf(random) === -1) {
					indexes.push(random);
					$('#select-from').children().eq(random).animate({
						position: 'absolute',
						left: '100%'
					}, timeout).animate({
						left: '0'
					}, 0);
					break;
				}
			}
			select(indexes);
		} else {
			$timeout(function () {
				for (i = 0; i < indexes.length; i++) {
					$scope.selected.push($scope.elements[indexes[i]]);
				}
				allowSelect = true;
			}, timeout);
		}
	}


	function randomRange(min, max) {
		return Math.floor(Math.random() * (max-min+1)) + min;
	}
});

app.filter('addOne', function() {
	return function(input) {
		return parseInt(input) + 1;
	};
});