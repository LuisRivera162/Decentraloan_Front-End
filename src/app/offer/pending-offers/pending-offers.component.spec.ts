import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOffersComponent } from './pending-offers.component';

describe('PendingOffersComponent', () => {
  let component: PendingOffersComponent;
  let fixture: ComponentFixture<PendingOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
