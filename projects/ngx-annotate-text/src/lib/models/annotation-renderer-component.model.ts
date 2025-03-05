import { Annotation } from './annotation.model';

export interface NgxAnnotationRendererComponentInterface {
  annotation: Annotation;
  removable: boolean;
  clickAnnotation: (annotation: Annotation) => void;
  removeAnnotation: (annotation: Annotation) => void;
}
