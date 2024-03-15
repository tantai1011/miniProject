import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-alt-snotify';

@Injectable({
  providedIn: 'root'
})
export class NgAltSnotifyService {
  
  constructor(private snotifyService: SnotifyService) { }

  config(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: true,
        maxAtPosition: 6,
        maxOnScreen: 8,
        filterDuplicates: false
      }
    });
    return {
      bodyMaxLength: 300,
      titleMaxLength: 100,
      backdrop: -1,
      position: SnotifyPosition.rightBottom,
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    };
  }

  success(body: string, title: string = "") {
    this.snotifyService.success(body, title, this.config());
  }

  info(body: string, title: string = "") {
    this.snotifyService.info(body, title, this.config());
  }

  error(body: string, title: string = "") {
    this.snotifyService.error(body, title, this.config());
  }

  warning(body: string, title: string = "") {
    this.snotifyService.warning(body, title, this.config());
  }

  simple(body: string, title: string = "") {
    this.snotifyService.simple(body, title, this.config());
  }

  confirm(body: string, title: string, okCallback: () => any, cancelCallBack?: () => any) {
    const config = { ...this.config() };
    config.position = SnotifyPosition.centerCenter;
    config.timeout = 0;
    config.backdrop = 0.5;
    config.closeOnClick = false;

    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        {
          text: 'OK',
          action: toast => {
            this.snotifyService.remove(toast.id);
            okCallback();
          },
          bold: true
        },
        {
          text: 'Cancel',
          action: toast => {
            this.snotifyService.remove(toast.id);
            if (typeof (cancelCallBack) === 'function') {
              cancelCallBack();
            }
          }
        }
      ]
    });
  }

  clear() {
    this.snotifyService.clear();
  }
}
