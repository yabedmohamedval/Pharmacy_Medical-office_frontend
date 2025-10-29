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
  offices: MedicalOffice[] = [];
  filtered: MedicalOffice[] = [];

  selectedCriteria: 'moughataa' | 'commune' | 'speciality' | 'open_time' = 'moughataa';
  searchTerm = '';
  filterMoughataa = '';
  filterCommune = '';
  filterOpen = '';
  filterSpeciality = '';

  moughataas: string[] = [];
  communes: string[] = [];
  specialities: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private officeService: MedicalOfficeService
  ) {}

  ngOnInit(): void {
    this.loadOffices();
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

  loadOffices(): void {
    this.officeService.getMedicalOffices().subscribe({
      next: (data) => {
        this.offices = data || [];
        this.filtered = [...this.offices];

        // listes uniques
        this.moughataas = Array.from(new Set(this.offices.map(o => o.moughataa).filter(Boolean))) as string[];
        this.specialities = Array.from(new Set(this.offices.map(o => o.speciality).filter(Boolean))) as string[];
        this.rebuildCommunesOptions();
      },
      error: (e) => console.error(e)
    });
  }

  rebuildCommunesOptions(): void {
    const pool = this.filterMoughataa
      ? this.offices.filter(o => (o.moughataa || '').toLowerCase() === this.filterMoughataa.toLowerCase())
      : this.offices;

    this.communes = Array.from(new Set(pool.map(o => o.commune).filter(Boolean))) as string[];

    // si commune choisie n’existe plus dans la liste, on la réinitialise
    if (this.filterCommune && !this.communes.includes(this.filterCommune)) {
      this.filterCommune = '';
    }
  }


  isVisitor(): boolean {
    const r = localStorage.getItem('roles');
    return r === 'VISITOR';
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onMoughataaChange(): void {
    this.rebuildCommunesOptions();
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filtered = this.offices.filter(o => {
      // moughataa
      if (this.filterMoughataa && (o.moughataa || '').toLowerCase() !== this.filterMoughataa.toLowerCase()) {
        return false;
      }
      // commune
      if (this.filterCommune && (o.commune || '').toLowerCase() !== this.filterCommune.toLowerCase()) {
        return false;
      }
      // open time
      if (this.filterOpen && (o.open_time || '') !== this.filterOpen) {
        return false;
      }
      // speciality
      if (this.filterSpeciality && (o.speciality || '').toLowerCase() !== this.filterSpeciality.toLowerCase()) {
        return false;
      }

      // recherche texte par critère
      if (!term) return true;

      switch (this.selectedCriteria) {
        case 'moughataa':  return (o.moughataa  || '').toLowerCase().includes(term);
        case 'commune':    return (o.commune    || '').toLowerCase().includes(term);
        case 'speciality': return (o.speciality || '').toLowerCase().includes(term);
        case 'open_time':  return (o.open_time  || '').toLowerCase().includes(term);
        default:           return true;
      }
    });
  }

  deleteOffice(id: number): void {
    if (!confirm('Supprimer ce cabinet ?')) return;
    this.officeService.deleteMedicalOffice(id).subscribe({
      next: () => {
        this.offices = this.offices.filter(o => o.id !== id);
        this.applyFilters();
        this.rebuildCommunesOptions();
      },
      error: (e) => console.error(e)
    });
  }

  openOnMap(o: MedicalOffice): void {
    if (o.latitude != null && o.longitude != null) {
      window.open(`https://www.openstreetmap.org/?mlat=${o.latitude}&mlon=${o.longitude}#map=18/${o.latitude}/${o.longitude}`, '_blank');
    } else if (o.addressFormatted || o.addressRaw) {
      const q = encodeURIComponent(o.addressFormatted || o.addressRaw!);
      window.open(`https://www.openstreetmap.org/search?query=${q}`, '_blank');
    }
  }

}
