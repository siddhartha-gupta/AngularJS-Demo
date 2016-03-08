/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	// export interface IMenuDirective extends ng.IScope
	export interface UserInfoScopeInterface extends ng.IScope {
		customController: any;
		userData: any;
		actionHandler: any;
	}
}
