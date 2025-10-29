import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


export interface StatsSummary {
  pharmacies: number;
  medicalOffices: number;
}
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private base = `${environment.serverURL}/api/stats`;
  constructor(private http: HttpClient) {}

  summary(): Observable<StatsSummary> {
    return this.http.get<StatsSummary>(`${this.base}/summary`);
  }
}
