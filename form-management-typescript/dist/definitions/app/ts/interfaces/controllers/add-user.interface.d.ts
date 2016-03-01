/// <reference path="../../../_all.d.ts" />
declare module app {
    interface AddUserInterface {
        validateEmail(val: string): void;
        validateForm(): Boolean;
        gotoUserList(): void;
        addUser(): void;
        userDataDefault(): void;
        showModalDialogue(errorType: string): void;
        hideModalDialogue(event?: Event): void;
        modalDialogueDefault(): void;
    }
}
