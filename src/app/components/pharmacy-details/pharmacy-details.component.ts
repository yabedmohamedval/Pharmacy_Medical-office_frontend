

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PharmacyServiceService } from '../../services/pharmacy-service.service';
import { Pharmacy } from '../../models/pharmacy.model';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent implements OnInit {
  pharmacy?: Pharmacy;

  constructor(
    private route: ActivatedRoute,
    private pharmacyService: PharmacyServiceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pharmacyService.getPharmacy(id).subscribe((data: Pharmacy) => {
      this.pharmacy = data;
    });
  }
}
