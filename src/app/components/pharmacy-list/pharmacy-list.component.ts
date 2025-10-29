import { Component, OnInit } from '@angular/core';
import { PharmacyServiceService } from '../../services/pharmacy-service.service';
import { Pharmacy } from '../../models/pharmacy.model';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent implements OnInit {
  // Données
  allPharmacies: Pharmacy[] = [];
  pharmacies: Pharmacy[] = [];   // alias pour compatibilité si tu en as besoin
  filtered: Pharmacy[] = [];

  // UI filtres/recherche
  selectedCriteria: 'moughataa'|'commune'|'open_time' = 'moughataa';
  searchTerm = '';
  filterWilaya = '';     // ici j’utilise moughataa = wilaya dans tes données
  filterOpen = '';
  wilayas: string[] = [];

  constructor(private pharmacyService: PharmacyServiceService) {}

  ngOnInit(): void {
    console.log(localStorage['roles']);
    this.loadPharmacies();
  }

  loadPharmacies(): void {
    this.pharmacyService.getPharmacies().subscribe((data: Pharmacy[]) => {
      this.allPharmacies = data || [];
      this.pharmacies    = data || []; // si d’autres parties de l’app l’utilisent
      this.computeWilayas();
      this.applyFilters();             // initial
    });
  }

  computeWilayas(): void {
    const set = new Set<string>();
    this.allPharmacies.forEach(p => { if (p?.moughataa) set.add(p.moughataa); });
    this.wilayas = Array.from(set).sort();
  }

  // appelé à chaque changement d’input/select
  onSearchChange(): void { this.applyFilters(); }

  applyFilters(): void {
    const term = (this.searchTerm || '').toLowerCase().trim();

    // 1) filtre par critère + terme
    let out = this.allPharmacies.filter(p => {
      if (!term) return true;
      const val = (p?.[this.selectedCriteria] || '').toString().toLowerCase();
      return val.includes(term);
    });

    // 2) filtre wilaya (moughataa) optionnel
    if (this.filterWilaya) {
      out = out.filter(p => p?.moughataa === this.filterWilaya);
    }

    // 3) filtre horaires optionnel
    if (this.filterOpen) {
      out = out.filter(p => p?.open_time === this.filterOpen);
    }

    this.filtered = out;
  }

  isVisitor(): boolean {
    // tu stockes "VISITOR" (vérifie bien la valeur côté backend/JWT)
    return localStorage['roles'] === 'VISITOR';
  }

  deletePharmacy(id: number): void {
    if (!confirm('Are you sure you want to delete this pharmacy?')) return;

    this.pharmacyService.deletePharmacy(id).subscribe(() => {
      // maj des 2 collections
      this.allPharmacies = this.allPharmacies.filter(p => p.id !== id);
      this.applyFilters();
      console.log(`Pharmacy with ID ${id} deleted.`);
    });
  }

  openOnMap(p: Pharmacy): void {
    if (p?.latitude && p?.longitude) {
      const url = `https://www.openstreetmap.org/?mlat=${p.latitude}&mlon=${p.longitude}#map=17/${p.latitude}/${p.longitude}`;
      window.open(url, '_blank');
    } else {
      const q = encodeURIComponent((p as any)?.addressFormatted || p.addressRaw || p.name || '');
      const url = `https://www.openstreetmap.org/search?query=${q}`;
      window.open(url, '_blank');
    }
  }
}
