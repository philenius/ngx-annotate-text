import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Annotation } from '../../models/annotation.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css'],
})
export class AnnotationComponent {
  @Input() annotation?: Annotation;
  @Input() removable = true;
  @Output() clickAnnotation = new EventEmitter<Annotation>();
  @Output() removeAnnotation = new EventEmitter<Annotation>();
}
