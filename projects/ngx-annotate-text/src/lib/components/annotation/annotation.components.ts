import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Annotation } from '../../models/annotation.model';

@Component({
  selector: 'ngx-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent {

  @Input() annotation: Annotation;
  @Input() removable = true;
  @Output() removeAnnotation = new EventEmitter<Annotation>();

  constructor() { }

}
