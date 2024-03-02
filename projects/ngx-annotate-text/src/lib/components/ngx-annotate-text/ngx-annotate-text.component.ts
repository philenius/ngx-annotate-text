import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Annotation } from '../../models/annotation.model';
import { ISelection } from '../../models/selection.model';
import { TokenizerService } from '../../services/tokenizer.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-annotate-text',
  templateUrl: './ngx-annotate-text.component.html',
  styleUrls: ['./ngx-annotate-text.component.css'],
})
export class NgxAnnotateTextComponent implements OnInit, OnChanges {
  /** Represents the parts of the given text which shall be annotated. */
  @Input() annotations: Annotation[] = [];

  /** An optional CSS class applied to all elements which wrap the annotated parts of the given text. */
  @Input() annotationClass?: string;

  /**
   * Determines whether annotations shall have a small button in the top right corner so that the user can
   * remove an annotation.
   */
  @Input() removable = true;

  /** The text which shall be displayed and annotated. */
  @Input() text = '';

  /** Emits the list of existing annotations after an element has been removed. */
  @Output() annotationsChange: EventEmitter<Annotation[]> = new EventEmitter<Annotation[]>();

  /** Emits the selected annotation when the user clicks on an annotation's box, the label or text. */
  @Output() clickAnnotation: EventEmitter<Annotation> = new EventEmitter<Annotation>();

  /** Emits the selected annotation when the user removes it by clicking the annotation's X button in the upper right corner. */
  @Output() removeAnnotation: EventEmitter<Annotation> = new EventEmitter<Annotation>();

  /** @internal */
  tokens: (string | Annotation)[] = [];
  private selectionStart?: number;
  private selectionEnd?: number;

  constructor(
    private elementRef: ElementRef,
    private tokenService: TokenizerService,
  ) {}

  ngOnInit(): void {
    this.tokens = this.tokenService.splitTextIntoTokens(this.text, this.annotations);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('annotations' in changes || 'text' in changes) {
      this.tokens = this.tokenService.splitTextIntoTokens(this.text, this.annotations);
    }
  }

  /**
   * Provides start and end index of the currently selected text.
   *
   * @returns Returns the start index and end index of the currently selected text range. Returns `undefined`
   * if no text is currently selected.
   */
  public getCurrentTextSelection(): ISelection | undefined {
    this.updateTextSelection();

    if (
      this.selectionStart === undefined ||
      this.selectionEnd === undefined ||
      this.selectionStart >= this.selectionEnd
    ) {
      return undefined;
    }

    return {
      startIndex: this.selectionStart,
      endIndex: this.selectionEnd,
    };
  }

  /**
   * Checks whether the given text selection is overlapping with existing annotations.
   *
   * @param selection The current text selection.
   * @returns Returns `true` if the given text selection is (partially) overlapping with
   * an existing annotation. Returns `false` otherwise.
   */
  public isOverlappingWithExistingAnnotations(selection: ISelection): boolean {
    const overlappingAnnotation = this.annotations.find((annotation) => {
      return Math.max(annotation.startIndex, selection.startIndex) < Math.min(annotation.endIndex, selection.endIndex);
    });
    return overlappingAnnotation != undefined;
  }

  /** @internal */
  isAnnotation(annotation: Annotation | string): boolean {
    return annotation instanceof Annotation;
  }

  /** @internal */
  toAnnotation(token: Annotation | string): Annotation {
    if (token instanceof Annotation) {
      return token as Annotation;
    }
    throw new TypeError('Cannot convert token of type string to type Annotation');
  }

  /** @internal */
  onRemoveAnnotation(annotation: Annotation): void {
    this.annotations = this.annotations.filter((a) => a !== annotation);
    this.removeAnnotation.emit(annotation);
    this.annotationsChange.emit(this.annotations);
    this.tokens = this.tokenService.splitTextIntoTokens(this.text, this.annotations);
  }

  private updateTextSelection(): void {
    const selection = window.getSelection();
    if (selection != null && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
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
}
