import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieComponent } from './modifie.component';

describe('ModifieComponent', () => {
  let component: ModifieComponent;
  let fixture: ComponentFixture<ModifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
