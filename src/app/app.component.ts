import { Component, Type, ViewChild } from '@angular/core';
import { NgxAnnotateTextModule } from '../../projects/ngx-annotate-text/src/lib/ngx-annotate-text.module';
import { Annotation, NgxAnnotateTextComponent } from '../../projects/ngx-annotate-text/src/public-api';
import { MyAnnotationRendererComponent } from './my-annotation-renderer/my-annotation-renderer.component';
import { NgxAnnotationRendererComponent } from '../../projects/ngx-annotate-text/src/lib/components/annotation-renderer/annotation-renderer.components';
import { FormsModule } from '@angular/forms';
import { NgxAnnotationRendererComponentInterface } from '../../projects/ngx-annotate-text/src/lib/models/annotation-renderer-component.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxAnnotateTextModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;

  annotations: Annotation[] = [
    new Annotation(3, 11, 'Date', '#0d6efd'),
    new Annotation(36, 45, 'City', '#dc3545'),
    new Annotation(47, 52, 'Country', '#198754'),
    new Annotation(77, 85, 'Time', '#6c757d'),
  ];

  areAnnotationsRemovable = true;

  events: string[] = [];

  rendererComponents: Type<NgxAnnotationRendererComponentInterface>[] = [
    NgxAnnotationRendererComponent,
    MyAnnotationRendererComponent,
  ];

  selectedRendererComponent: Type<NgxAnnotationRendererComponentInterface> = NgxAnnotationRendererComponent;

  text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

  addAnnotation(label: string, color: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      alert('The selected text is already annotated.');
      return;
    }

    const annotation = new Annotation(selection.startIndex, selection.endIndex, label, color);
    this.annotations = this.annotations.concat(annotation);
    this.events.push(`Added '${annotation}'`);
  }

  onClickAnnotation(annotation: Annotation) {
    this.events.push(`Clicked on '${annotation}'`);
  }

  onRemoveAnnotation(annotation: Annotation): void {
    this.events.push(`Removed '${annotation}'`);
  }
}
