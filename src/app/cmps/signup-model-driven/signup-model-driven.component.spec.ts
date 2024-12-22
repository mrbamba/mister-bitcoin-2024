import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModelDrivenComponent } from './signup-model-driven.component';

describe('SignupModelDrivenComponent', () => {
  let component: SignupModelDrivenComponent;
  let fixture: ComponentFixture<SignupModelDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupModelDrivenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupModelDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
