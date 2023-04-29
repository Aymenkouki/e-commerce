import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixItemComponent } from './fix-item.component';

describe('FixItemComponent', () => {
  let component: FixItemComponent;
  let fixture: ComponentFixture<FixItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
