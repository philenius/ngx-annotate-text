import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Annotation } from '../../models/annotation.model';
import { NgxAnnotationRendererComponentInterface } from '../../models/annotation-renderer-component.model';
import { ISelection } from '../../models/selection.model';
import { NgxAnnotationRendererComponent } from '../annotation-renderer/annotation-renderer.components';

import { NgxAnnotateTextComponent } from './ngx-annotate-text.component';

describe('NgxAnnotateTextComponent', () => {
  let component: NgxAnnotateTextComponent;
  let fixture: ComponentFixture<NgxAnnotateTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAnnotateTextComponent, NgxAnnotationRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxAnnotateTextComponent);
    component = fixture.componentInstance;
  });

  it('should display the whole text when there are no initial annotations', () => {
    const text =
      'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.text = text;
    fixture.detectChanges();

    const textSpanElement = fixture.debugElement.nativeElement.querySelector('span:first-of-type');
    expect(textSpanElement.textContent).toBe(text);
  });

  it('should display the whole given text as a single annotated token', () => {
    const annotations = [new Annotation(0, 86, 'Annotation', 'red')];
    const text =
      'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    fixture.detectChanges();

    expect(component.tokens.length).toBe(annotations.length);
    expect(component.tokens[0]).toBeInstanceOf(Annotation);
    expect((component.tokens[0] as Annotation).text).toBe(text);
  });

  it('should correctly determine the type of a token', () => {
    const annotation: Annotation = new Annotation(0, 5, 'Token', 'black');
    annotation.text = 'Hello';

    expect(component.isAnnotation(annotation)).toBe(true);
    expect(component.isAnnotation('Hello')).toBe(false);
  });

  describe('toRecord()', () => {
    it('should convert an instance of Annotation to a record of inputs for the annotation renderer component', () => {
      const annotation: Annotation = new Annotation(0, 7, 'Language', 'red');
      annotation.text = 'Spanish';

      expect(component.toRecord(annotation)).toEqual({
        annotation: annotation,
        removable: true,
        clickAnnotation: expect.any(Function),
        removeAnnotation: expect.any(Function),
      });
    });

    it('should convert an instance of Annotation to a record of inputs for the annotation renderer component when annotations are removable', () => {
      component.removable = false;
      const annotation: Annotation = new Annotation(0, 7, 'Language', 'red');
      annotation.text = 'Spanish';

      expect(component.toRecord(annotation)).toEqual({
        annotation: annotation,
        removable: false,
        clickAnnotation: expect.any(Function),
        removeAnnotation: expect.any(Function),
      });
    });

    it('should not convert an instance of string', () => {
      const annotation: Annotation | string = 'Hello';

      expect(() => component.toRecord(annotation)).toThrowError(
        'Cannot convert token of type string to type Record',
      );
    });
  });

  it('should emit an empty list of annotations if the only annotation has been removed', () => {
    vi.spyOn(component.annotationsChange, 'emit');
    vi.spyOn(component.removeAnnotation, 'emit');
    const annotations = [new Annotation(36, 45, 'City', 'red')];
    const text =
      'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    component.onRemoveAnnotation(annotations[0]);
    fixture.detectChanges();

    expect(component.annotationsChange.emit).toHaveBeenCalledWith([]);
    expect(component.removeAnnotation.emit).toHaveBeenCalledWith(annotations[0]);
    expect(component.annotations.length).toBe(0);
  });

  it('should emit the list of remaining annotations if an annotation has been removed', () => {
    vi.spyOn(component.annotationsChange, 'emit');
    vi.spyOn(component.removeAnnotation, 'emit');
    const annotations = [
      new Annotation(36, 45, 'City', 'red'),
      new Annotation(47, 52, 'Country', 'red'),
    ];
    const text =
      'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    component.annotations = annotations;
    component.text = text;
    component.onRemoveAnnotation(annotations[0]);
    fixture.detectChanges();

    expect(component.annotationsChange.emit).toHaveBeenCalledWith([annotations[1]]);
    expect(component.removeAnnotation.emit).toHaveBeenCalledWith(annotations[0]);
    expect(component.annotations.length).toBe(1);
  });

  it('should recompute the list of tokens if the text input has changed', () => {
    component.annotations = [new Annotation(0, 5, 'Token', 'red')];
    component.text = 'Hello, world';
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');

    fixture.componentRef.setInput('text', 'Now, with an updated message.');
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Now, ');
  });

  it('should recompute the list of tokens if the annotations input has changed', () => {
    component.annotations = [new Annotation(0, 5, 'Token1', 'red')];
    component.text = 'Hello, world';
    fixture.detectChanges();

    expect(component.tokens.length).toBe(2);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');

    fixture.componentRef.setInput('annotations', [
      new Annotation(0, 5, 'Token1', 'red'),
      new Annotation(7, 12, 'Token2', 'red'),
    ]);
    fixture.detectChanges();

    expect(component.tokens.length).toBe(3);
    expect((component.tokens[0] as Annotation).text).toBe('Hello');
    expect(component.tokens[1]).toBe(', ');
    expect((component.tokens[2] as Annotation).text).toBe('world');
  });

  describe('getCurrentTextSelection()', () => {
    it('should return `undefined` if no text is selected', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      component.text = text;
      const selection = window.getSelection();
      selection!.removeAllRanges();
      fixture.detectChanges();

      expect(component.getCurrentTextSelection()).toBeUndefined();
    });

    it('should return the correct boundaries if the whole text is selected', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      component.text = text;
      fixture.detectChanges();

      const node = fixture.debugElement.nativeElement.querySelector('span:first-of-type');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection!.removeAllRanges();
      selection!.addRange(range);
      fixture.detectChanges();

      expect(component.getCurrentTextSelection()!.startIndex).toBe(0);
      expect(component.getCurrentTextSelection()!.endIndex).toBe(text.length);
    });

    it('should return the correct boundaries if the beginning of the text is selected', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      component.text = text;
      fixture.detectChanges();

      selectTextRangeInDocument(0, 2);
      fixture.detectChanges();

      expect(component.getCurrentTextSelection()!.startIndex).toBe(0);
      expect(component.getCurrentTextSelection()!.endIndex).toBe(2);
    });

    it('should return the correct boundaries if the middle of the text is selected', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      component.text = text;
      fixture.detectChanges();

      selectTextRangeInDocument(3, 11);
      fixture.detectChanges();

      expect(component.getCurrentTextSelection()!.startIndex).toBe(3);
      expect(component.getCurrentTextSelection()!.endIndex).toBe(11);
    });

    it('should return the correct boundaries if the end of the text is selected', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      component.text = text;
      fixture.detectChanges();

      selectTextRangeInDocument(76, 86);
      fixture.detectChanges();

      expect(component.getCurrentTextSelection()!.startIndex).toBe(76);
      expect(component.getCurrentTextSelection()!.endIndex).toBe(86);
    });

    describe('with emojis in the text', () => {
      const text = 'We 😍 Barcelona 🇪🇸 and its beaches 🏖️.';

      it('should return boundaries that match the indices of the text', () => {
        component.text = text;
        fixture.detectChanges();

        selectTextInNode('beaches', 'beaches'.length);

        const selection = component.getCurrentTextSelection()!;
        expect(text.substring(selection.startIndex, selection.endIndex)).toBe('beaches');
      });

      it('should return boundaries that match the indices of the text behind an annotation', () => {
        component.text = text;
        const cityStart = text.indexOf('Barcelona');
        component.annotations = [new Annotation(cityStart, cityStart + 9, 'City', 'red')];
        fixture.detectChanges();

        selectTextInNode('beaches', 'beaches'.length);

        const selection = component.getCurrentTextSelection()!;
        expect(text.substring(selection.startIndex, selection.endIndex)).toBe('beaches');
      });
    });

    describe('with a custom renderer that renders the label as text', () => {
      const text =
        'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

      beforeEach(() => {
        component.text = text;
        component.annotations = [new Annotation(3, 11, 'Date', 'red')];
        component.annotationRendererComponent = LabelAsTextRendererComponent;
        fixture.detectChanges();
      });

      it('should ignore the label when the selection is behind an annotation', () => {
        selectTextInNode('vacation', 'vacation'.length);

        expect(component.getCurrentTextSelection()).toEqual({ startIndex: 24, endIndex: 32 });
      });

      it('should return the correct boundaries if the whole text is selected', () => {
        const range = document.createRange();
        range.selectNodeContents(fixture.nativeElement);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        expect(component.getCurrentTextSelection()).toEqual({
          startIndex: 0,
          endIndex: text.length,
        });
      });

      it('should snap a selection starting inside an annotation to the start of the annotation', () => {
        const range = document.createRange();
        const annotationTextNode = findTextNode('August 1');
        range.setStart(annotationTextNode, 3);
        range.setEnd(findTextNode(', we went'), 4);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selection = component.getCurrentTextSelection()!;
        expect(selection).toEqual({ startIndex: 3, endIndex: 15 });
        expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
      });
    });
  });

  describe('isOverlappingWithExistingAnnotations()', () => {
    it('should return false if there is no annotation that overlaps with the selection', () => {
      const selection: ISelection = { startIndex: 5, endIndex: 9 };

      component.annotations = [
        new Annotation(0, 5, 'Article', 'yellow'),
        new Annotation(9, 11, 'Article', 'yellow'),
        new Annotation(16, 22, 'Article', 'yellow'),
      ];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(false);
    });

    /**
     * Annotation:  ####
     * Selection:   ####
     */
    it('should return true if there exists an annotation with identical start and end index', () => {
      const selection: ISelection = { startIndex: 5, endIndex: 12 };

      component.annotations = [new Annotation(5, 12, 'Noun', 'blue')];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
    });

    /**
     * Annotation:    ####
     * Selection:   ####
     */
    it('should return true if the selection partially overlaps with an existing annotation', () => {
      const selection: ISelection = { startIndex: 0, endIndex: 6 };

      component.annotations = [new Annotation(4, 8, 'Verb', 'red')];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
    });

    /**
     * Annotation:  ####
     * Selection:     ####
     */
    it('should return true if the selection partially overlaps with an existing annotation', () => {
      const selection: ISelection = { startIndex: 6, endIndex: 12 };

      component.annotations = [new Annotation(4, 8, 'Adjective', 'orange')];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
    });

    /**
     * Annotation:  ####
     * Selection:    ##
     */
    it('should return true if the selection is part of an existing annotation', () => {
      const selection: ISelection = { startIndex: 6, endIndex: 8 };

      component.annotations = [new Annotation(4, 10, 'Adjective', 'orange')];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
    });

    /**
     * Annotation:   ##
     * Selection:   ####
     */
    it('should return true if the selection is part of an existing annotation', () => {
      const selection: ISelection = { startIndex: 4, endIndex: 10 };

      component.annotations = [new Annotation(6, 8, 'Adjective', 'orange')];

      expect(component.isOverlappingWithExistingAnnotations(selection)).toBe(true);
    });
  });

  function selectTextRangeInDocument(start: number, end: number): void {
    const node = fixture.debugElement.nativeElement.querySelector('span.unlabeled');
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(node.childNodes[0], start);
    range.setEnd(node.childNodes[0], end);
    selection!.removeAllRanges();
    selection!.addRange(range);
  }

  function findTextNode(content: string): Text {
    const walker = document.createTreeWalker(fixture.nativeElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (walker.currentNode.textContent!.includes(content)) {
        return walker.currentNode as Text;
      }
    }
    throw new Error(`No text node contains '${content}'`);
  }

  function selectTextInNode(content: string, length: number): void {
    const node = findTextNode(content);
    const start = node.textContent!.indexOf(content);
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, start + length);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
  }
});

@Component({
  template: `<button (click)="clickAnnotation(annotation)">{{ annotation.text }}</button>
    <span>{{ annotation.label }}</span>`,
})
class LabelAsTextRendererComponent implements NgxAnnotationRendererComponentInterface {
  @Input() annotation!: Annotation;
  @Input() removable = true;
  @Input() clickAnnotation: (annotation: Annotation) => void = () => undefined;
  @Input() removeAnnotation: (annotation: Annotation) => void = () => undefined;
}
