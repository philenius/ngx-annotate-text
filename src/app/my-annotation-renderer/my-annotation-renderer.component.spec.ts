import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnotationRendererComponent } from './my-annotation-renderer.component';

describe('MyAnnotationRendererComponent', () => {
  let component: MyAnnotationRendererComponent;
  let fixture: ComponentFixture<MyAnnotationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAnnotationRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAnnotationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
