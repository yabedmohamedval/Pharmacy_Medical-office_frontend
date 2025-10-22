import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacy } from '../models/pharmacy.model';
import { GeocodeResult } from '../models/geocode-result.model';


@Injectable({
  providedIn: 'root'
})
export class PharmacyServiceService {
  private apiUrl = 'http://localhost:8081/pharmacies';
  private base = 'http://localhost:8081'

  constructor(private http: HttpClient) {}

  getPharmacies(): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(this.apiUrl);
  }

  getPharmacy(id: number): Observable<Pharmacy> {
    return this.http.get<Pharmacy>(`${this.apiUrl}/${id}`);
  }

  createPharmacy(pharmacy: Pharmacy): Observable<Pharmacy> {
    return this.http.post<Pharmacy>(this.apiUrl, pharmacy);
  }

  // (optionnel) appels géocoding via backend si tu as exposé les endpoints
  forwardGeocode(q: string) {
    return this.http.get<GeocodeResult>(`${this.base}/api/geocode/search`, {
      params: new HttpParams().set('q', q),
    });
  }

  reverseGeocode(lat: number, lon: number) {
    return this.http.get<GeocodeResult>(`${this.base}/api/geocode/reverse`, {
      params: new HttpParams().set('lat', lat).set('lon', lon),
    });
  }

  updatePharmacy(id: number, pharmacy: Pharmacy): Observable<Pharmacy> {
    return this.http.put<Pharmacy>(`${this.apiUrl}/${id}`, pharmacy);
  }

  deletePharmacy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
