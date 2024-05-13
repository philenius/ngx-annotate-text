import { Component, Input } from '@angular/core';
import { Annotation } from '../../../dist/ngx-annotate-text/public-api';

@Component({
  selector: 'app-my-annotation-renderer',
  standalone: true,
  imports: [],
  templateUrl: './my-annotation-renderer.component.html',
  styleUrl: './my-annotation-renderer.component.css',
})
export class MyAnnotationRendererComponent {
  @Input({ required: true }) annotation!: Annotation;
  @Input() removable = true;
  @Input() clickAnnotation!: (annotation: Annotation) => void;
  @Input() removeAnnotation!: (annotation: Annotation) => void;

  protected popupEnabled: boolean = false;

  onMouseEnter(): void {
    this.popupEnabled = true;
  }
  onMouseLeave(): void {
    this.popupEnabled = false;
  }
}
