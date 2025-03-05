import { Component, Input } from '@angular/core';
import {
  Annotation,
  NgxAnnotationRendererComponentInterface,
} from '../../../projects/ngx-annotate-text/src/public-api';

@Component({
  selector: 'app-my-annotation-renderer',
  standalone: true,
  imports: [],
  templateUrl: './my-annotation-renderer.component.html',
  styleUrl: './my-annotation-renderer.component.css',
})
export class MyAnnotationRendererComponent implements NgxAnnotationRendererComponentInterface {
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
