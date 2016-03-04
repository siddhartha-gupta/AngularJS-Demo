describe('app', function() {
	var addUserController;

	beforeEach(module('controllers'));
	beforeEach(module('services'));

	beforeEach(inject(function($controller, $rootScope, $location, $injector) {
		var scope = $rootScope.$new(),
			apiService = $injector.get('APIService'),
			utilsService = $injector.get('UtilsService'),
			sharedService = $injector.get('SharedService');

		addUserController = $controller('AddUserController', {
			$scope: scope,
			$location: location,
			apiService: apiService,
			utilsService: utilsService,
			sharedService: sharedService
		});
	}));

	// to test 'validateEmail'
	it('validEmail will be false', function() {
		addUserController.validateEmail('test');
		expect(addUserController.validEmail).toEqual(false);
	});

	it('validEmail will be true', function() {
		addUserController.validateEmail('test@test.com');
		expect(addUserController.validEmail).toEqual(true);
	});

	// to test 'validateForm'
	it('user form should return false', function() {
		addUserController.userData = {
			'firstname': 'test',
			'lastname': 'test',
			'email': '',
			'phonenumber': '',
			'location': ''
		}
		expect(addUserController.validateForm()).toEqual(false);
	});

	it('user form should return true', function() {
		addUserController.userData = {
			'firstname': 'test',
			'lastname': 'test',
			'email': 'test@test.com',
			'phonenumber': '123423432453',
			'location': 'IN'
		}
		expect(addUserController.validateForm()).toEqual(true);
	});

	// to test 'addUser'
	it('user form should return true', function() {
		addUserController.userData = {
			'firstname': 'test',
			'lastname': 'test',
			'email': 'test@test.com',
			'phonenumber': '',
			'location': 'IN'
		}
		expect(addUserController.addUser()).toEqual(false);
	});
});

/*
addUser() {
	this.utilsService.log('add user: ', this.userData);

	if (this.validateForm()) {
		this.apiService.postCall({
			'url': this.appConfig.serverUrl + 'adduser',
			data: this.userData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success((response: any) => {
			this.utilsService.log('success: ', response);

			if (response && response.resp && response.resp === 'Email already in use') {
				this.showModalDialogue('emailInUse');
			} else {
				this.gotoUserList();
			}
		}).error((response: any) => {
			this.utilsService.log('error: ', response);
		});
	}
}
*/
