import { Injectable } from '@angular/core';
import { Annotation } from '../models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class TokenizerService {
  public splitTextIntoTokens(text: string, annotations: Annotation[]): (Annotation | string)[] {
    if (annotations.length === 0) {
      return [text];
    }

    const annotationStartingIndices = new Map();
    const tokens = [];

    // Creates a map which contains the starting indices for each annotation
    // as keys. This way, we know the positions / indices in the text where
    // we need to display an annotation instead of the plaintext.
    annotations.forEach((a: Annotation) => {
      annotationStartingIndices.set(a.startIndex, a);
      a.text = text.substring(a.startIndex, a.endIndex);
    });

    let currentIndex = 0;
    let isAnnotationActive = false;
    let annotationActiveUntilIndex = 0;
    let buffer = '';

    text.split('').forEach((char: string) => {
      if (annotationActiveUntilIndex === currentIndex) {
        isAnnotationActive = false;
      }

      if (!annotationStartingIndices.has(currentIndex) && !isAnnotationActive) {
        buffer += char;
      } else if (annotationStartingIndices.has(currentIndex)) {
        if (buffer.length > 0) {
          tokens.push(buffer);
        }
        tokens.push(annotationStartingIndices.get(currentIndex));
        annotationActiveUntilIndex = annotationStartingIndices.get(currentIndex).endIndex;
        buffer = '';
        isAnnotationActive = true;
      }

      currentIndex++;
    });

    if (buffer.length > 0) {
      tokens.push(buffer);
    }

    return tokens;
  }
}
