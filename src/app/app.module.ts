import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationModule } from './features/navigation/navigation.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [NavigationModule, RouterOutlet],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
