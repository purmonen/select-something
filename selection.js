var app = angular.module('app', []);

app.controller('SelectionCtrl', function($scope, $timeout) {
	$scope.elements = [];
	// $scope.elements = [{value: 'a', count: 0}, {value: 'b', count: 0}, {value: 'c', count: 0}];
	$scope.selected = [];
	$scope.element = '';
	$scope.selectionSize = 0;
	$scope.focus = true;
	var allowSelect = true;

	$scope.addElement = function() {
		var element = $scope.element.trim();
		$scope.element = '';

		if (element) {
			color = '#';
			for (i = 0; i < 6; i++) {
				color += (Math.floor(Math.random() * 15)).toString(16);
			}

			console.log(color);
			$scope.elements.push({value: element, count: 0, color: color});
		}

		if ($scope.elements.length === 1) {
			$scope.selectionSize = 1;
		}
	};

	$scope.removeElement = function(index) {
		$scope.selectionSize = 1;
		$scope.elements.splice(index, 1);
	}

	$scope.removeElements = function() {
		$scope.elements = [];
		$scope.selected = [];
	}

	$scope.selectElements = function() {
		if (allowSelect) {
			allowSelect = false;
			$scope.selected = [];
			select([]);
		}
	}

	function select(indexes) {
		var timeout = 300;
		var random;
		var i;
		var e;

		if (indexes.length < $scope.selectionSize) {
			while (indexes.indexOf(random) !== -1 || random === undefined) {
				console.log('loop');
				random = randomRange(0, $scope.elements.length-1);
			}
			indexes.push(random);
			e = $('#select-from').children().eq(random);
			e.animate({
				position: 'absolute',
				left: '108%'
			}, timeout);

			$timeout(function() {
				select(indexes);
			}, timeout);
		} else {
			$timeout(function() {
				allowSelect = true;
				for (i = 0; i < indexes.length; i++) {
					element = $scope.elements[indexes[i]];
					element.count += 1;
					$scope.selected.push(element);
					e = $('#select-from').children().eq(indexes[i]);
					e.css({left: '0'});
				}
				$scope.elements.sort(function(x,y) {
					if (x.count > y.count) {
						return -1;
					} else if (x.count < y.count) {
						return 1;
					}
					return 0;
				});
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