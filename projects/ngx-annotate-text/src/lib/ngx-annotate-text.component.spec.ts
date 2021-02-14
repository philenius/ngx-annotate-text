import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAnnotateTextComponent } from './ngx-annotate-text.component';

describe('NgxAnnotateTextComponent', () => {
  let component: NgxAnnotateTextComponent;
  let fixture: ComponentFixture<NgxAnnotateTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAnnotateTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAnnotateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
