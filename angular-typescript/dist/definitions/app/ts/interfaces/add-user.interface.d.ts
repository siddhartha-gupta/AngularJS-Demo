/// <reference path="../../_all.d.ts" />
declare module app {
    interface AddUserInterface {
        validateEmail(val: string): any;
        validateForm(): any;
        addUser(): any;
        userDataDefault(): any;
        showModalDialogue(errorType: string): any;
        hideModalDialogue(event?: Event): any;
        modalDialogueDefault(): any;
    }
}
