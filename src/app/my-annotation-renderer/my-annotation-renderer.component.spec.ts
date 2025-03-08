import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnotationRendererComponent } from './my-annotation-renderer.component';
import { Annotation } from '../../../projects/ngx-annotate-text/src/public-api';

describe('MyAnnotationRendererComponent', () => {
  let component: MyAnnotationRendererComponent;
  let fixture: ComponentFixture<MyAnnotationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MyAnnotationRendererComponent] }).compileComponents();

    fixture = TestBed.createComponent(MyAnnotationRendererComponent);
    component = fixture.componentInstance;
    component.annotation = new Annotation(7, 12, 'noun', 'red');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    component.clickAnnotation = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    component.removeAnnotation = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
