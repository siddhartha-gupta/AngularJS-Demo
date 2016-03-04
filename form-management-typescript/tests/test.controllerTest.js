describe('app', function() {
	var TestController;

	beforeEach(module('controllers'));
	beforeEach(module('services'));

	beforeEach(inject(function($controller, $rootScope, $injector) {
		var scope = $rootScope.$new(),
			utilsService = $injector.get('UtilsService');


		testController = $controller('TestController', {
			$scope: scope,
			configService: utilsService
		});
	}));

	it('validEmail will be false', function() {
		// expect(testController.validEmail).toBeDefined();
		testController.validateEmail('test');
		expect(testController.validEmail).toEqual(false);
	});

	it('validEmail will be true', function() {
		// expect(testController.validEmail).toBeDefined();
		testController.validateEmail('test@test.com');
		expect(testController.validEmail).toEqual(true);
	});
});
