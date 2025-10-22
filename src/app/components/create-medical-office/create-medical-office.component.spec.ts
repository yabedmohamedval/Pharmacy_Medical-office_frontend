import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalOfficeComponent } from './create-medical-office.component';

describe('CreateMedicalOfficeComponent', () => {
  let component: CreateMedicalOfficeComponent;
  let fixture: ComponentFixture<CreateMedicalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMedicalOfficeComponent]
    });
    fixture = TestBed.createComponent(CreateMedicalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
