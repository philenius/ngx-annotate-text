import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnnotationComponent } from './components/annotation/annotation.components';
import { NgxAnnotateTextComponent } from './components/ngx-annotate-text/ngx-annotate-text.component';

@NgModule({
  declarations: [
    AnnotationComponent,
    NgxAnnotateTextComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [NgxAnnotateTextComponent]
})
export class NgxAnnotateTextModule { }
