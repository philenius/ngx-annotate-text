import { Component, Input } from '@angular/core';
import { Annotation } from '../../models/annotation.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-annotation-renderer',
  templateUrl: './annotation-renderer.component.html',
  styleUrls: ['./annotation-renderer.component.css'],
})
export class NgxAnnotationRendererComponent {
  @Input({ required: true }) annotation!: Annotation;
  @Input() removable = true;
  @Input() clickAnnotation!: (annotation: Annotation) => void;
  @Input() removeAnnotation!: (annotation: Annotation) => void;
}
