import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
})
export class TranslateComponent {
  currentLanguage = 'en';
  constructor(
    private translate: TranslateService,
    private adapter: DateAdapter<Date>,
    private messageService: MessageService,
  ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    this.adapter.setLocale(language);
    this.messageService.add(this.translate.instant('languageChanged'));
  }
}
