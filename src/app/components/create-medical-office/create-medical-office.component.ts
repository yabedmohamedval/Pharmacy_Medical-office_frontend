// create-medical-office.component.ts
import {AfterViewInit, Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { MedicalOfficeService } from '../../services/medical-office.service';
import {PharmacyServiceService} from "../../services/pharmacy-service.service";

@Component({
  selector: 'app-create-medical-office',
  templateUrl: './create-medical-office.component.html',
  styleUrls: ['./create-medical-office.component.css']
})
export class CreateMedicalOfficeComponent implements AfterViewInit {
  medicalOfficeForm: FormGroup;
  map!: L.Map;
  marker?: L.Marker;

  constructor(
    private fb: FormBuilder,
    private officeService: MedicalOfficeService,
    private geoApi: PharmacyServiceService,
    private router: Router
  ) {
    this.medicalOfficeForm = this.fb.group({
      name: ['', Validators.required],
      addressRaw: ['', Validators.required],
      latitude: [null],
      longitude: [null],
      moughataa: ['', Validators.required],
      commune: ['', Validators.required],
      speciality: ['medecine generale'], // défaut
      open_time: ['24/24', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    // centre Nouakchott
    this.map = L.map('map-office').setView([18.0735, -15.9582], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    // clic sur la carte => place/maj le marker + reverse geocode
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
    this.medicalOfficeForm.patchValue({ latitude: lat, longitude: lng });
    if (doReverse) {
      this.geoApi.reverseGeocode(lat, lng).subscribe({
        next: (r: any) => this.medicalOfficeForm.patchValue({ addressRaw: r.formattedAddress }),
        error: () => {}
      });
    }
  }

  locateByText() {
    const q = (this.medicalOfficeForm.value.addressRaw || '').trim();
    if (!q) return;
    this.geoApi.forwardGeocode(q).subscribe({
      next: (r: any) => {
        const lat = r.lat, lon = r.lng;
        if (lat && lon) this.placeMarker(lat, lon, false);
      },
      error: () => {}
    });
  }

  onSubmit() {
    if (this.medicalOfficeForm.invalid) return;

    this.officeService.createMedicalOffice(this.medicalOfficeForm.value)
      .subscribe({
        next: (data) => {
          console.log('Medical Office created!', data);
          this.router.navigate(['/medical-offices']);
        },
        error: (err) => console.error(err)
      });
  }

}
