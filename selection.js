var app = angular.module('app', []);

app.controller('SelectionCtrl', function($scope, $timeout) {
	$scope.elements = [];
	$scope.selected = [];
	$scope.element = '';
	$scope.selectionSize = 0;
	$scope.showNoSelection = true;
	$scope.focus = true;
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
			highLight(10, $('#select-from').children(), 0, 150, function() {
				select([]);
			});
		}
	}

	function highLight(count, children, last, timeout, func) {
		if (count > 0) {
			while (true) {
				i = randomRange(0, $scope.elements.length - 1);
				if (i != last) {
					break;
				}
			}
			console.log(i);
			e = children.eq(i);
			e.addClass('highlight');
			count -= 1;
			$timeout(function() {
				e.removeClass('highlight');
				highLight(count, children, i, timeout, func);
			},  timeout);
		} else {
			func();
		}
	}

	function select(indexes) {
		var timeout = 250;
		if (indexes.length < $scope.selectionSize) {
			while (true) {
				random = randomRange(0, $scope.elements.length-1);
				if (indexes.indexOf(random) === -1) {
					indexes.push(random);
					var e = $('#select-from').children().eq(random);
					e.addClass('highlight')
					e.animate({
						position: 'absolute',
						left: '100%',
						opacity: 0.8,
					}, timeout).animate({
						left: '0',
						opacity: 1
					}, 0, function() {
						e.removeClass('highlight');
					});
					break;
				}
			}
			$timeout(function() {
				$scope.selected.push($scope.elements[indexes[indexes.length-1]]);
				select(indexes);
			}, timeout);
		} else {
			allowSelect = true;
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