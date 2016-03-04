describe(‘Controller: PasswordController, test AngularJs’, function() {
	var scope, PasswordController;
	beforeEach(module(‘phonecatApp’));
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		PasswordController = $controller(‘PasswordController’, {
			$scope: scope
		});
	}));
	it(‘sets the strength to“ strong”
		if the password length is > 8 chars’,
		function() {
			scope.password = ‘longerthaneightchars’;
			scope.grade();
			expect(scope.strength).toEqual(‘strong’);
		});
	it(‘sets the strength to“ weak”
		if the password length❤ chars’,
		function() {
			scope.password = ‘a’;
			scope.grade();
			expect(scope.strength).toEqual(‘weak’);
		});
});
