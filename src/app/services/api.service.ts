import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

export interface Links {

}
export interface ApiResult {}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getHeaders(customHeaders?: { [header: string]: string }): HttpHeaders {
    let headers = this.headers;
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (customHeaders) {
      headers = headers.set(Object.keys(customHeaders)[0], Object.values(customHeaders)[0]);
    }
    return headers;
  }


  createUser(userData:any, url: string) {

    const user = {
      username: userData[0].username,
      password: userData[0].password,
      role:userData[0].role
      // Ajoutez ici d'autres champs si nécessaire
    };
    console.log(user);
    return this.http.post(environment.serverURL +'/api'+url,user,{ headers:this.getHeaders() });
  }



  getRessource(url: string): Observable<ApiResult> {
    console.log(this.getHeaders());
    return this.http.get<ApiResult>(environment.serverURL + url, { headers: this.getHeaders() });
  }

  deleteById(url:string):Observable<any>{
    return this.http.delete(environment.serverURL+url,{headers:this.getHeaders()});
  }

  resetPassword(url: string, id:number) {
    return this.http.put(environment.serverURL+url,id,{headers:this.getHeaders()});
  }
}
