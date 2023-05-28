import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxAnnotateTextComponent } from 'ngx-annotate-text';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, NgxAnnotateTextComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
