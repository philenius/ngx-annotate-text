import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAnnotateTextModule } from 'ngx-annotate-text';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxAnnotateTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
