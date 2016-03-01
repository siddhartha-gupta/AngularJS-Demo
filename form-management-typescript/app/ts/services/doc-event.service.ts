/// <reference path='../../_all.ts' />

module app {
  'use strict';

  export class DocEventService {
    private docRef: HTMLElement;

    public static $inject = [
      '$document'
    ];

    constructor(private $document: ng.IDocumentService) { }

    bindMouseEvent() { }

    bindKeyboardEvent(callback) {
      this.$document.on('keydown keypress', (event) => {
        if (event.which === 27) {
          console.log('esc pressed');
          callback(event);
        }
      });
    }

    unbindMouseEvent() { }

    unbindKeyboardEvent() {
      this.$document.off('keydown keypress');
    }
  }
}
services.service('DocEventService', app.DocEventService);
