// create-medical-office.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalOfficeService } from '../../services/medical-office.service';

@Component({
  selector: 'app-create-medical-office',
  templateUrl: './create-medical-office.component.html',
  styleUrls: ['./create-medical-office.component.css']
})
export class CreateMedicalOfficeComponent {
  medicalOfficeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicalOfficeService: MedicalOfficeService,
    private router: Router
  ) {
    this.medicalOfficeForm = this.fb.group({}); // Initial empty FormGroup
    this.createForm();
  }

  createForm() {
    this.medicalOfficeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      wilaya: ['', Validators.required],
      moughataa: ['', Validators.required],
      commune: ['', Validators.required],
      speciality: [''], // Not required and not pre-filled
      open_time: ['24/24', Validators.required]
    });
  }

  onSubmit() {
    if (!this.medicalOfficeForm.value.speciality) {
      this.medicalOfficeForm.patchValue({ speciality: 'generale' });
    }

    this.medicalOfficeService.createMedicalOffice(this.medicalOfficeForm.value)
      .subscribe(data => {
        console.log('Medical Office created!', data);
        this.router.navigate(['/medical-offices']);
      });
  }
}
