/// <reference path='../../_all.ts' />

module app {
  'use strict';

  export class DocEventService implements DocEventServiceInterface {
    private docRef: HTMLElement;

    public static $inject = [
      '$document'
    ];

    constructor(private $document: ng.IDocumentService) { }

    bindMouseEvent(callback: Function) {
      this.$document.on('click', (event) => {
        callback(event);
      });
    }

    bindKeyboardEvent(callback: Function) {
      this.$document.on('keydown keypress', (event) => {
        if (event.which === 27) {
          callback(event);
        }
      });
    }

    unbindMouseEvent() {
      this.$document.off('click');
    }

    unbindKeyboardEvent() {
      this.$document.off('keydown keypress');
    }
  }
}
services.service('DocEventService', app.DocEventService);
