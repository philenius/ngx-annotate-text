import { TestBed } from '@angular/core/testing';
import { Annotation } from '../models/annotation.model';

import { TokenizerService } from './tokenizer.service';

describe('TokenizerService', () => {
  let service: TokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenizerService);
  });

  it('should split the text into the correct tokens if given one annotation at the beginning of the text', () => {
    const annotations = [
      new Annotation(0, 2, 'Start Token', 'red'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    const actualTokens = service.splitTextIntoTokens(text, annotations);

    expect(actualTokens.length).toBe(annotations.length + 1);
    expect(actualTokens[0] instanceof Annotation).toBeTrue();
    expect(typeof actualTokens[1]).toBe('string');

    expect((actualTokens[0] as Annotation).color).toBe('red');
    expect((actualTokens[0] as Annotation).label).toBe('Start Token');
    expect((actualTokens[0] as Annotation).text).toBe('On');
    expect((actualTokens[0] as Annotation).startIndex).toBe(0);
    expect((actualTokens[0] as Annotation).endIndex).toBe(2);
  });

  it('should split the text into the correct tokens if given one annotation at the end of the text', () => {
    const annotations = [
      new Annotation(83, 86, 'End Token', 'green'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    const actualTokens = service.splitTextIntoTokens(text, annotations);

    expect(actualTokens.length).toBe(1 + annotations.length);
    expect(typeof actualTokens[0]).toBe('string');
    expect(actualTokens[0]).toBe('On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 ');

    expect(actualTokens[1] instanceof Annotation).toBeTrue();
    expect((actualTokens[1] as Annotation).color).toBe('green');
    expect((actualTokens[1] as Annotation).label).toBe('End Token');
    expect((actualTokens[1] as Annotation).text).toBe('am.');
    expect((actualTokens[1] as Annotation).startIndex).toBe(83);
    expect((actualTokens[1] as Annotation).endIndex).toBe(86);
  });

  it('should split the text into the correct tokens if given one annotation in the middle of the text', () => {
    const annotations = [
      new Annotation(36, 45, 'City', '#fff'),
    ];
    const text = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

    const actualTokens = service.splitTextIntoTokens(text, annotations);

    expect(actualTokens.length).toBe(1 + annotations.length + 1);
    expect(typeof actualTokens[0]).toBe('string');
    expect(actualTokens[0]).toBe('On August 1, we went on vacation to ');

    expect(actualTokens[1] instanceof Annotation).toBeTrue();
    expect((actualTokens[1] as Annotation).color).toBe('#fff');
    expect((actualTokens[1] as Annotation).label).toBe('City');
    expect((actualTokens[1] as Annotation).text).toBe('Barcelona');
    expect((actualTokens[1] as Annotation).startIndex).toBe(36);
    expect((actualTokens[1] as Annotation).endIndex).toBe(45);

    expect(typeof actualTokens[2]).toBe('string');
    expect(actualTokens[2]).toBe(', Spain. Our flight took off at 11:00 am.');
  });
});
