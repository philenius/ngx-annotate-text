import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { NgxAnnotationRendererComponent } from './components/annotation/annotation-renderer.components';
import { NgxAnnotateTextComponent } from './components/ngx-annotate-text/ngx-annotate-text.component';

@NgModule({
  declarations: [NgxAnnotationRendererComponent, NgxAnnotateTextComponent],
  imports: [CommonModule, NgComponentOutlet],
  exports: [NgxAnnotateTextComponent, NgxAnnotationRendererComponent],
})
export class NgxAnnotateTextModule {}
