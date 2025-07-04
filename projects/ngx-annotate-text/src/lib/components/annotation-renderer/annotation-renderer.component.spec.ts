import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Annotation } from '../../models/annotation.model';

import { NgxAnnotationRendererComponent } from './annotation-renderer.components';

describe('AnnotationRendererComponent', () => {
  let component: NgxAnnotationRendererComponent;
  let fixture: ComponentFixture<NgxAnnotationRendererComponent>;
  const getAnnotationContentElement = (): HTMLElement =>
    fixture.nativeElement.querySelector('span.annotation-content pre');
  const getAnnotationLabelElement = (): HTMLElement => fixture.nativeElement.querySelector('span.annotation-label');
  const getAnnotationParentElement = (): HTMLElement => fixture.nativeElement.querySelector('button.annotation-parent');

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NgxAnnotationRendererComponent] }).compileComponents();

    fixture = TestBed.createComponent(NgxAnnotationRendererComponent);
    component = fixture.componentInstance;
    component.clickAnnotation = jasmine.createSpy('clickAnnotation');
    component.removeAnnotation = jasmine.createSpy('removeAnnotation');
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

  it("should call the callback function 'removeAnnotation' when a user clicks on the remove button", async () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;
    component.removable = true;

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button.remove-annotation').click();

    await fixture.whenStable();
    expect(component.removeAnnotation).toHaveBeenCalledWith(annotation);
  });

  it("should call the callback function 'clickAnnotation' when a user clicks on the annotation's box", async () => {
    const annotation = new Annotation(0, 13, 'City', 'rgb(60, 65, 75)');
    annotation.text = 'San Francisco';
    component.annotation = annotation;

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button.annotation-parent').click();

    await fixture.whenStable();
    expect(component.clickAnnotation).toHaveBeenCalledWith(annotation);
  });

  it("should call the callback function 'clickAnnotation' when the user clicks on the annotation's text", async () => {
    const annotation = new Annotation(0, 11, 'City', 'rgb(0, 255, 255)');
    annotation.text = 'Los Angeles';
    component.annotation = annotation;

    fixture.detectChanges();

    fixture.nativeElement.querySelector('span.annotation-content').click();

    await fixture.whenStable();
    expect(component.clickAnnotation).toHaveBeenCalledWith(annotation);
  });

  it("should call the callback function 'clickAnnotation' when the user clicks on the annotation's label", async () => {
    const annotation = new Annotation(0, 9, 'City', 'rgb(255, 255, 0)');
    annotation.text = 'Frankfurt';
    component.annotation = annotation;

    fixture.detectChanges();

    fixture.nativeElement.querySelector('span.annotation-label').click();

    await fixture.whenStable();
    expect(component.clickAnnotation).toHaveBeenCalledWith(annotation);
  });
});
