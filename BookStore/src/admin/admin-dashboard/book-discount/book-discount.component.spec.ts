import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDiscountComponent } from './book-discount.component';

describe('BookDiscountComponent', () => {
  let component: BookDiscountComponent;
  let fixture: ComponentFixture<BookDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
