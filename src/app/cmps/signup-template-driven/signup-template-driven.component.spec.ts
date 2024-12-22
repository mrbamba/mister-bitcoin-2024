import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTemplateDrivenComponent } from './signup-template-driven.component';

describe('SignupTemplateDrivenComponent', () => {
  let component: SignupTemplateDrivenComponent;
  let fixture: ComponentFixture<SignupTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupTemplateDrivenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
