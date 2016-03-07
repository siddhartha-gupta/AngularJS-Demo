/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UserDataInterface {
        id_member?: string;
        firstname: string;
        lastname: string;
        email: string;
        phonenumber: string;
        location: string;
        timestamp?: number;
    }
    interface userEditDataInterface {
        firstname: string;
        lastname: string;
        location: string;
    }
}
