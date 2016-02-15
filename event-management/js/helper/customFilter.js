'use strict';

eventsApp.filter('durations', function() {
	return function(duration) {
		switch (duration) {
			case 1:
				return "one hour";
			case 2:
				return "2 Hour";
			case 4:
				return "Half Day";
			case 8:
				return "Full Day";
		}
	};
});
