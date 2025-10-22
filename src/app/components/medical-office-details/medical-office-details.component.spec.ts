import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalOfficeDetailsComponent } from './medical-office-details.component';

describe('MedicalOfficeDetailsComponent', () => {
  let component: MedicalOfficeDetailsComponent;
  let fixture: ComponentFixture<MedicalOfficeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalOfficeDetailsComponent]
    });
    fixture = TestBed.createComponent(MedicalOfficeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
