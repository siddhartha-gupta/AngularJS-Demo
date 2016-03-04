describe('app', function() {
	var TestController;

	beforeEach(module('controllers'));
	beforeEach(inject(function($controller) {
		TestController = $controller('TestController', {});
	}));

	it('validEmail will be false', function() {
		expect(TestController.validEmail).toBeDefined();
	});
});
