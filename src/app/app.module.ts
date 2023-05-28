import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxAnnotateTextModule } from 'projects/ngx-annotate-text/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxAnnotateTextModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
