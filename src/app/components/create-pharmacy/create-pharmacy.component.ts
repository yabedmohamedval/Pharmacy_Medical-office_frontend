


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { PharmacyServiceService } from '../../services/pharmacy-service.service';
import {Pharmacy} from "../../models/pharmacy.model";


@Component({
  selector: 'app-create-pharmacy',
  templateUrl: './create-pharmacy.component.html',
  styleUrls: ['./create-pharmacy.component.css']
})
export class CreatePharmacyComponent {
  pharmacyForm: FormGroup;
  map!: L.Map;
  marker?: L.Marker;

  constructor(
    private fb: FormBuilder,
    private pharmacyService: PharmacyServiceService,
    private router: Router
  ) {
    this.pharmacyForm = this.fb.group({}); // Initial empty FormGroup
    this.createForm();
  }

  createForm() {
    this.pharmacyForm = this.fb.group({
      name: ['', Validators.required],
      addressRaw: ['', Validators.required],
      latitude: [null],
      longitude: [null],
      moughataa: ['', Validators.required],
      commune: ['', Validators.required],
      open_time: ['24/24', Validators.required]
    });
  }


  ngAfterViewInit(): void {
    // centre Nouakchott
    this.map = L.map('map').setView([18.0735, -15.9582], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    // clic carte => placer marker + reverse
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.placeMarker(e.latlng.lat, e.latlng.lng, true);
    });
  }

  placeMarker(lat: number, lng: number, doReverse: boolean) {
    if (!this.marker) {
      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
      this.marker.on('dragend', () => {
        const ll = this.marker!.getLatLng();
        this.updateCoords(ll.lat, ll.lng, true);
      });
    } else {
      this.marker.setLatLng([lat, lng]);
    }
    this.map.setView([lat, lng], this.map.getZoom());
    this.updateCoords(lat, lng, doReverse);
  }

  updateCoords(lat: number, lng: number, doReverse: boolean) {
    this.pharmacyForm.patchValue({ latitude: lat, longitude: lng });
    if (doReverse) {
      // reverse via TON backend (évite CORS/quotas côté front)
      this.pharmacyService.reverseGeocode(lat, lng).subscribe({
        next: r => this.pharmacyForm.patchValue({ addressRaw: r.formattedAddress }),
        error: () => {}
      });
    }
  }

  locateByText() {
    const q = (this.pharmacyForm.value.addressRaw || '').trim();
    if (!q) return;
    this.pharmacyService.forwardGeocode(q).subscribe({
      next: r => {
        const lat = r.lat, lon = r.lng;
        if (lat && lon) this.placeMarker(lat, lon, false);
      },
      error: () => {}
    });
  }


  onSubmit() {
    if (this.pharmacyForm.invalid) return;

    const body: Pharmacy = this.pharmacyForm.value as Pharmacy;
    this.pharmacyService.createPharmacy(body).subscribe({
      next: (data) => {
        console.log('Pharmacy created!', data);
        this.router.navigate(['/pharmacies']);
      },
      error: (err) => console.error(err)
    });
  }
}
