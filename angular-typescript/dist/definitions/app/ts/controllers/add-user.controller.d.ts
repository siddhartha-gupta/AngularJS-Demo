/// <reference path="../../_all.d.ts" />
declare module app {
    class AddUserController implements AddUserInterface {
        private $scope;
        private $location;
        private apiService;
        private utilsService;
        private sharedService;
        private validEmail;
        private userdata;
        private appConfig;
        private modalDialogue;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, apiService: APIService, utilsService: UtilsService, sharedService: SharedService);
        validateEmail(val: string): void;
        validateForm(): boolean;
        addUser(): void;
        userDataDefault(): void;
        showModalDialogue(errorType: string): void;
        hideModalDialogue(event?: Event): void;
        modalDialogueDefault(): void;
    }
}
