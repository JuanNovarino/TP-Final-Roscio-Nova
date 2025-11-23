import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedProductDetails } from './logged-product-details';

describe('LoggedProductDetails', () => {
  let component: LoggedProductDetails;
  let fixture: ComponentFixture<LoggedProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
