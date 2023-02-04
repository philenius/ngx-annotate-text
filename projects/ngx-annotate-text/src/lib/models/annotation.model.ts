import { ISelection } from './selection.model';

export interface IAnnotation {
  text: string | undefined;
  label: string;
  color: string;
}

export class Annotation implements IAnnotation, ISelection {
  startIndex: number;
  endIndex: number;
  text: string | undefined;
  label: string;
  color: string;

  /**
   * Represents an annotated part of the referenced text.
   *
   * @param startIndex The zero-based index number indicating the beginning of this annotation.
   * @param endIndex The zero-based index number indicating the end of the annotation. The annotation
   * includes the characters up to, but not including, the character indicated by the end.
   * @param label Arbitrary string displayed as label below the annotation, e. g. `City`.
   * @param color The color of the box which is displayed around the annotation, e. g. 'red' or 'rgb(220, 53, 69)'.
   */
  constructor(
    startIndex: number,
    endIndex: number,
    label: string,
    color: string
  ) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.label = label;
    this.color = color;
  }

  toString(): String {
    return `Annotation(startIndex=${this.startIndex}, endIndex=${this.endIndex}, label=${this.label}, color=${this.color})`;
  }
}
