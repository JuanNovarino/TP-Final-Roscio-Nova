import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myrestaurant } from './myrestaurant';

describe('Myrestaurant', () => {
  let component: Myrestaurant;
  let fixture: ComponentFixture<Myrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myrestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myrestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
