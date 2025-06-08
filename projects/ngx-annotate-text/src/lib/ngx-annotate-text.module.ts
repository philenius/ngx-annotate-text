import { NgModule } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { NgxAnnotationRendererComponent } from './components/annotation-renderer/annotation-renderer.components';
import { NgxAnnotateTextComponent } from './components/ngx-annotate-text/ngx-annotate-text.component';

@NgModule({
  declarations: [],
  imports: [NgComponentOutlet, NgxAnnotationRendererComponent, NgxAnnotateTextComponent],
  exports: [NgxAnnotationRendererComponent, NgxAnnotateTextComponent],
})
export class NgxAnnotateTextModule {}
