import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Annotation } from '../../models/annotation.model';
import { ISelection } from '../../models/selection.model';

@Component({
  selector: 'ngx-annotate-text',
  templateUrl: './ngx-annotate-text.component.html',
  styleUrls: ['./ngx-annotate-text.component.css']
})
export class NgxAnnotateTextComponent implements OnInit, OnChanges {

  /** Represents the parts of the given text which shall be annotated. */
  @Input() annotations: Annotation[] = [];

  /** An optional CSS class applied to all elements which wrap the annotated parts of the given text. */
  @Input() annotationClass: string;

  /**
   * Determines whether annotations shall have a small button in the top right corner so that the user can
   * remove an annotation.
   */
  @Input() removable = true;

  /** The text which shall be displayed and annotated. */
  @Input() text: string;

  /** Emits the list of existing annotations after an element has been removed. */
  @Output() annotationsChange: EventEmitter<Annotation[]> = new EventEmitter<Annotation[]>();

  /** @internal */
  tokens: any[] = [];
  private selectionStart: number;
  private selectionEnd: number;
  private annotationStartingIndices: Map<number, Annotation> = new Map();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.splitTextIntoTokens();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('annotations' in changes || 'text' in changes) {
      this.splitTextIntoTokens();
    }
  }

  /**
   * Returns the start index and end index of the currently selected text range. Returns `undefined`
   * if no text is currently selected.
   */
  public getCurrentTextSelection(): ISelection {
    this.updateTextSelection();

    if (this.selectionStart === undefined || this.selectionEnd === undefined || this.selectionStart >= this.selectionEnd) {
      return undefined;
    }

    return {
      startIndex: this.selectionStart,
      endIndex: this.selectionEnd,
    };
  }

  /** @internal */
  isAnnotation(annotation: Annotation | string): boolean {
    return annotation instanceof Annotation;
  }

  /** @internal */
  onRemoveAnnotation(annotation: Annotation): void {
    this.annotations = this.annotations.filter(a => a !== annotation);
    this.annotationsChange.emit(this.annotations);
    this.splitTextIntoTokens();
  }

  private updateTextSelection(): void {
    if (window.getSelection && window.getSelection().rangeCount > 0) {
      const range = window.getSelection().getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(this.elementRef.nativeElement);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      this.selectionStart = [...preSelectionRange.toString()].length;
      this.selectionEnd = this.selectionStart + [...range.toString()].length;
    } else {
      this.selectionStart = undefined;
      this.selectionEnd = undefined;
    }
  }

  private splitTextIntoTokens(): void {
    this.tokens = [];
    this.annotationStartingIndices = new Map();

    // Creates a map which contains the starting indices for each annotation
    // as keys. This way, we know the positions / indices in the text where
    // we need to display an annotation instead of the plaintext.
    this.annotations.forEach((a: Annotation) => {
      this.annotationStartingIndices.set(a.startIndex, a);
      a.text = this.text.substring(a.startIndex, a.endIndex);
    });

    let currentIndex = 0;
    let isAnnotationActive = false;
    let annotationActiveUntilIndex = 0;
    let buffer = '';

    this.text.split('').forEach((char: string) => {
      if (annotationActiveUntilIndex === currentIndex) {
        isAnnotationActive = false;
      }

      if (!this.annotationStartingIndices.has(currentIndex) && !isAnnotationActive) {
        buffer += char;
      } else if (this.annotationStartingIndices.has(currentIndex)) {
        if (buffer.length > 0) {
          this.tokens.push(buffer);
        }
        this.tokens.push(this.annotationStartingIndices.get(currentIndex));
        annotationActiveUntilIndex = this.annotationStartingIndices.get(currentIndex).endIndex;
        buffer = '';
        isAnnotationActive = true;
      }

      currentIndex++;
    });

    this.tokens.push(buffer);
  }

}
