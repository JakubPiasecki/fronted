import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private translate: TranslateService) {}

  add(messageKey: string) {
    this.messages.push(messageKey);
  }

  getTranslatedMessages() {
    return this.messages.map((message) => this.translate.instant(message));
  }

  clear() {
    this.messages = [];
  }
}
