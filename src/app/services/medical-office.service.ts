import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalOffice } from '../models/medical-office.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MedicalOfficeService {
  private baseUrl: string = environment.serverURL;
  private apiUrl: string = `${this.baseUrl}/medicalOffices`;


  constructor(private http: HttpClient) {}

  getMedicalOffices(): Observable<MedicalOffice[]> {
    return this.http.get<MedicalOffice[]>(this.apiUrl);
  }

  getMedicalOffice(id: number): Observable<MedicalOffice> {
    return this.http.get<MedicalOffice>(`${this.apiUrl}/${id}`);
  }

  createMedicalOffice(medicalOffice: MedicalOffice): Observable<MedicalOffice> {
    return this.http.post<MedicalOffice>(this.apiUrl, medicalOffice);
  }

  updateMedicalOffice(id: number, medicalOffice: MedicalOffice): Observable<MedicalOffice> {
    return this.http.put<MedicalOffice>(`${this.apiUrl}/${id}`, medicalOffice);
  }

  deleteMedicalOffice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
