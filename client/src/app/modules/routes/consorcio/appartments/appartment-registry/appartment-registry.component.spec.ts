import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoComponent } from './cupo-registry.component';

describe('CupoComponent', () => {
  let component: CupoComponent;
  let fixture: ComponentFixture<CupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
