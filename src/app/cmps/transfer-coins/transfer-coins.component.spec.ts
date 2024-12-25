import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCoinsComponent } from './transfer-coins.component';

describe('TransferCoinsComponent', () => {
  let component: TransferCoinsComponent;
  let fixture: ComponentFixture<TransferCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferCoinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
