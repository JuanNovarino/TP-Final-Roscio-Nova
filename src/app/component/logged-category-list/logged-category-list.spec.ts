import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedCategoryList } from './logged-category-list';

describe('LoggedCategoryList', () => {
  let component: LoggedCategoryList;
  let fixture: ComponentFixture<LoggedCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedCategoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedCategoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
