import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedProductList } from './logged-product-list';

describe('LoggedProductList', () => {
  let component: LoggedProductList;
  let fixture: ComponentFixture<LoggedProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedProductList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
