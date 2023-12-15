import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPurchaseOrdersComponent } from './all-purchase-orders.component';

describe('AllPurchaseOrdersComponent', () => {
  let component: AllPurchaseOrdersComponent;
  let fixture: ComponentFixture<AllPurchaseOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPurchaseOrdersComponent]
    });
    fixture = TestBed.createComponent(AllPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
