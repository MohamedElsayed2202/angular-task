import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyDropdownComponent } from './categoty-dropdown.component';

describe('CategotyDropdownComponent', () => {
  let component: CategotyDropdownComponent;
  let fixture: ComponentFixture<CategotyDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategotyDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategotyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
