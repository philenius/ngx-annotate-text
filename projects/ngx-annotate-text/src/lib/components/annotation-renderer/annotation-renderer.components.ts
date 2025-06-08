import { Component, Input } from '@angular/core';
import { Annotation } from '../../models/annotation.model';
import { NgxAnnotationRendererComponentInterface } from '../../models/annotation-renderer-component.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-annotation-renderer',
  templateUrl: './annotation-renderer.component.html',
  styleUrls: ['./annotation-renderer.component.css'],
  standalone: true,
})
export class NgxAnnotationRendererComponent implements NgxAnnotationRendererComponentInterface {
  @Input({ required: true }) annotation!: Annotation;
  @Input() removable = true;
  @Input() clickAnnotation!: (annotation: Annotation) => void;
  @Input() removeAnnotation!: (annotation: Annotation) => void;
}
