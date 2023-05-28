import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationComponent } from './components/annotation/annotation.components';
import { NgxAnnotateTextComponent } from './components/ngx-annotate-text/ngx-annotate-text.component';

@NgModule({
  declarations: [AnnotationComponent, NgxAnnotateTextComponent],
  imports: [CommonModule],
  exports: [NgxAnnotateTextComponent],
})
export class NgxAnnotateTextModule {}
