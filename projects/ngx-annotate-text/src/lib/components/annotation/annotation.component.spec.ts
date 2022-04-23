import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Annotation } from '../../models/annotation.model';

import { AnnotationComponent } from './annotation.components';

describe('AnnotationComponent', () => {

  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let getAnnotationContentElement = (): HTMLElement => fixture.nativeElement.querySelector('span.annotation-content pre');
  let getAnnotationLabelElement = (): HTMLElement => fixture.nativeElement.querySelector('span.annotation-label');
  let getAnnotationParentElement = (): HTMLElement => fixture.nativeElement.querySelector('span.annotation-parent');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnotationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the text of the annotation', () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;

    fixture.detectChanges();

    expect(getAnnotationContentElement().textContent).toBe(annotation.text);
  });

  it('should display the label of the annotation', () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;

    fixture.detectChanges();

    expect(getAnnotationLabelElement().getAttribute('data-label')).toBe(annotation.label);
  });

  it('should set the border color of the annotation to the specified color', () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;

    fixture.detectChanges();

    expect(getAnnotationParentElement().style.borderColor).toBe(annotation.color);
  });

  it(`should set the background color of the annotation's label to the specified color`, () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;

    fixture.detectChanges();

    expect(getAnnotationLabelElement().style.backgroundColor).toBe(annotation.color);
  });

  it('should display a button to remove the annotation if removable == true', () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;
    component.removable = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.remove-annotation')).toBeDefined();
  });

  it('should not display a button to remove the annotation if removable == false', () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;
    component.removable = false;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.remove-annotation')).toBeNull();
  });

  it('should remove the annotation on clicking the remove button', async () => {
    spyOn(component.removeAnnotation, 'emit');

    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;
    component.removable = true;

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button.remove-annotation').click();

    fixture.whenStable().then(() => {
      expect(component.removeAnnotation.emit).toHaveBeenCalled();
    });
  });

});
