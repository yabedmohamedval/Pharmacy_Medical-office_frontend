import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalOfficeService } from '../../services/medical-office.service';
import { MedicalOffice } from '../../models/medical-office.model';

@Component({
  selector: 'app-medical-office-details',
  templateUrl: './medical-office-details.component.html',
  styleUrls: ['./medical-office-details.component.css']
})
export class MedicalOfficeDetailsComponent implements OnInit {
  medicalOffice?: MedicalOffice;

  constructor(
    private route: ActivatedRoute,
    private medicalOfficeService: MedicalOfficeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.medicalOfficeService.getMedicalOffice(id).subscribe((data: MedicalOffice) => {
      this.medicalOffice = data;
    });
  }
}
