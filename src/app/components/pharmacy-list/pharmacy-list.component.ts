

import { Component, OnInit } from '@angular/core';
import { PharmacyServiceService } from '../../services/pharmacy-service.service';
import { Pharmacy } from '../../models/pharmacy.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  selectedPharmacy: Pharmacy | null = null; // Initialisation à null pour indiquer qu'aucune pharmacie n'est sélectionnée

  originalPharmacy: Pharmacy | null = null; // Stockage de la copie originale pour l'annulation
  selectedCriteria: string = 'moughataa';
  searchTerm: string = '';

  constructor(private pharmacyService: PharmacyServiceService) {}

  ngOnInit(): void {
    console.log(localStorage["roles"]);
    this.loadPharmacies();
  }

  loadPharmacies() {
    this.pharmacyService.getPharmacies().subscribe((data: Pharmacy[]) => {
      this.pharmacies = data;
    });
  }
  isVisitor(){
    return localStorage["roles"]=="VISITER";
  }
  deletePharmacy(id: number) {
    if (confirm('Are you sure you want to delete this pharmacy?')) {
      this.pharmacyService.deletePharmacy(id).subscribe(() => {
        this.pharmacies = this.pharmacies.filter(pharmacy => pharmacy.id !== id);
        console.log(`Pharmacy with ID ${id} deleted.`);
      });
    }
  }


 

  onSearchChange() {
    if (!this.searchTerm) {
      this.loadPharmacies(); // Recharge la liste complète si aucun terme n'est saisi
      return;
    }
    this.pharmacies = this.pharmacies.filter(pharmacy => {
      switch (this.selectedCriteria) {
        case 'moughataa':
          return pharmacy.moughataa.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'commune':
          return pharmacy.commune.toLowerCase().includes(this.searchTerm.toLowerCase());
        case 'open_time':
          return pharmacy.open_time.toLowerCase().includes(this.searchTerm.toLowerCase());
        default:
          return false;
      }
    });
  }
}
