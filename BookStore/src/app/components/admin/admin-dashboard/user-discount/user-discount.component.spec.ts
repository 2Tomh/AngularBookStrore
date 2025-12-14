import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiscountComponent } from './user-discount.component';

describe('UserDiscountComponent', () => {
  let component: UserDiscountComponent;
  let fixture: ComponentFixture<UserDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
