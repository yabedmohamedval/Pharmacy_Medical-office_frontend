import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalOfficeListComponent } from './medical-office-list.component';

describe('MedicalOfficeListComponent', () => {
  let component: MedicalOfficeListComponent;
  let fixture: ComponentFixture<MedicalOfficeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalOfficeListComponent]
    });
    fixture = TestBed.createComponent(MedicalOfficeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
