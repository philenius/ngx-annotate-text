import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Annotation } from 'ngx-annotate-text';

import { NgxAnnotateTextComponent } from './ngx-annotate-text.component';

describe('NgxAnnotateTextComponent', () => {
  let component: NgxAnnotateTextComponent;
  let fixture: ComponentFixture<NgxAnnotateTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxAnnotateTextComponent]
    });

    fixture = TestBed.createComponent(NgxAnnotateTextComponent);
    component = fixture.componentInstance;

  });

  it('should display the whole text when there are no initial annotations', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    const textSpanElement = fixture.debugElement.nativeElement.querySelector('span:first-of-type');
    expect(textSpanElement.textContent).toBe(text);
  });

  it('should display the whole given text as a single annotated token', () => {
    const annotations = [
      new Annotation(0, 86, 'Annotation', 'red'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    fixture.detectChanges();

    expect(component.tokens.length).toBe(annotations.length);
    expect(component.tokens[0] instanceof Annotation).toBeTrue();
    expect((component.tokens[0] as Annotation).text).toBe(text);
  });

  // it('should correctly determine the type of a token', () => {
  //   const annotation: Annotation = new Annotation(0, 5, 'Token', 'black');
  //   annotation.text = 'Hello';

  //   expect(component.isAnnotation(annotation)).toBeTrue();
  //   expect(component.isAnnotation('Hello')).toBeFalse();
  // });

  it('should emit an empty list of annotations if the only annotation has been removed', () => {
    spyOn(component.annotationsChange, 'emit');
    const annotations = [
      new Annotation(36, 45, 'City', 'red'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    component.onRemoveAnnotation(annotations[0]);
    fixture.detectChanges();

    expect(component.annotationsChange.emit).toHaveBeenCalledWith([]);
    expect(component.annotations.length).toBe(0);
  });

  it('should emit the list of remaining annotations if an annotation has been removed', () => {
    spyOn(component.annotationsChange, 'emit');
    const annotations = [
      new Annotation(36, 45, 'City', 'red'),
      new Annotation(47, 52, 'Country', 'red'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    component.onRemoveAnnotation(annotations[0]);
    fixture.detectChanges();

    expect(component.annotationsChange.emit).toHaveBeenCalledWith([annotations[1]]);
    expect(component.annotations.length).toBe(1);
  });

  it('should recompute the list of tokens if the text input has changed', () => {
    component.annotations = [
      new Annotation(0, 5, 'Token', 'red'),
    ];
    component.text = 'Hello, world';
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');

    component.text = 'Now, with an updated message.';
    component.ngOnChanges({
      text: new SimpleChange('Hello, world', 'Now, with an updated message.', false),
    });
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Now, ');
  });

  it('should recompute the list of tokens if the annotations input has changed', () => {
    component.annotations = [
      new Annotation(0, 5, 'Token1', 'red'),
    ];
    component.text = 'Hello, world';
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');

    component.annotations = [
      new Annotation(0, 5, 'Token1', 'red'),
      new Annotation(7, 12, 'Token2', 'red'),
    ];
    component.ngOnChanges({
      annotations: new SimpleChange([], [], false),
    });
    fixture.detectChanges();

    expect(component.tokens.length).toBe(3);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');
    expect(component.tokens[1]).toBe(', ');
    expect((component.tokens[2] as Annotation).text).toBe('world');
  });

  it('should return `undefined` if no text is selected', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    const selection = window.getSelection();
    selection.removeAllRanges();
    fixture.detectChanges();

    expect(component.getCurrentTextSelection()).toBeUndefined();
  });

  it('should return the correct boundaries if the whole text is selected', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    const node = fixture.debugElement.nativeElement.querySelector('span:first-of-type');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    fixture.detectChanges();

    expect(component.getCurrentTextSelection().startIndex).toBe(0);
    expect(component.getCurrentTextSelection().endIndex).toBe(text.length);
  });

  it('should return the correct boundaries if the beginning of the text is selected', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    selectTextRangeInDocument(0, 2);
    fixture.detectChanges();

    expect(component.getCurrentTextSelection().startIndex).toBe(0);
    expect(component.getCurrentTextSelection().endIndex).toBe(2);
  });

  it('should return the correct boundaries if the middle of the text is selected', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    selectTextRangeInDocument(3, 11);
    fixture.detectChanges();

    expect(component.getCurrentTextSelection().startIndex).toBe(3);
    expect(component.getCurrentTextSelection().endIndex).toBe(11);
  });

  it('should return the correct boundaries if the end of the text is selected', () => {
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    selectTextRangeInDocument(76, 86);
    fixture.detectChanges();

    expect(component.getCurrentTextSelection().startIndex).toBe(76);
    expect(component.getCurrentTextSelection().endIndex).toBe(86);
  });

  function selectTextRangeInDocument(start: number, end: number): void {
    const node = fixture.debugElement.nativeElement.querySelector('span.unlabeled');
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(node.childNodes[0], start);
    range.setEnd(node.childNodes[0], end);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
