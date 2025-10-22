import { Component, OnInit } from '@angular/core';
import { MedicalOfficeService } from '../../services/medical-office.service';
import { MedicalOffice } from '../../models/medical-office.model';

@Component({
  selector: 'app-medical-office-list',
  templateUrl: './medical-office-list.component.html',
  styleUrls: ['./medical-office-list.component.css']
})
export class MedicalOfficeListComponent implements OnInit {
  medicalOffices: MedicalOffice[] = [];
  selectedCriteria: string = 'wilaya';
  searchTerm: string = '';

  constructor(private medicalOfficeService: MedicalOfficeService) {}

  ngOnInit(): void {
    this.loadMedicalOffices();
  }
  isVisitor(){
    return localStorage["roles"]=="VISITER";
  }
  loadMedicalOffices() {
    this.medicalOfficeService.getMedicalOffices().subscribe((data: MedicalOffice[]) => {
      this.medicalOffices = data;
    });
  }


  deleteMedicalOffice(id: number) {
    if (confirm('Are you sure you want to delete this medical office?')) {
      this.medicalOfficeService.deleteMedicalOffice(id).subscribe(() => {
        this.medicalOffices = this.medicalOffices.filter(office => office.id !== id);
        console.log(`Medical Office with ID ${id} deleted.`);
      });
    }
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.loadMedicalOffices(); // Recharge la liste complète si aucun terme n'est saisi
      return;
    }
    this.medicalOffices = this.medicalOffices.filter(office => {
      switch (this.selectedCriteria) {
        case 'wilaya':
          return office.wilaya.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'moughataa':
          return office.moughataa.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'commune':
          return office.commune.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'specialite':
          return office.speciality.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'open_time':
          return office.open_time.toLowerCase().includes(this.searchTerm.toLowerCase());
        default:
          return false;
      }
    });
  }

}
