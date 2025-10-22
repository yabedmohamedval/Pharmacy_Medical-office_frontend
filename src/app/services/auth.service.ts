import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly jwtTokenName = 'access_token';

  private authUser = new ReplaySubject<string | null>(1);
  public authUserObservable = this.authUser.asObservable();

  constructor(private readonly http: HttpClient,
              private readonly jwtHelper: JwtHelperService,
              private router: Router
  ){}

  hasAccess(): Promise<boolean> {
    const jwt = localStorage.getItem(this.jwtTokenName);
    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      return new Promise((resolve) => {
        this.http.get(`${environment.serverURL}/auth/authenticate`)
          .subscribe({
            next: () => {
              this.authUser.next(jwt);
              resolve(true);
            },
            error: () => {
              this.logout();
              resolve(false);
            }
          });
      });
    } else {
      this.logout();
      return Promise.resolve(false);
    }
  }


  signUp(user : User){
    return this.http.post(`${environment.serverURL}/auth/signup`, user);
  }

  login(username: string, password: string ): Observable<string> {
    localStorage.clear()
    const values = { username, password };
    return this.http.post(`${environment.serverURL}/auth/login`, values, {responseType: 'text'})
    .pipe(tap(jwt =>this.handleJwtResponse(jwt)));
  }

  logout(): void {
    localStorage.removeItem(this.jwtTokenName);
    this.authUser.next(null);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private handleJwtResponse(jwt: any): void {
    localStorage.setItem(this.jwtTokenName, jwt);
    this.authUser.next(jwt);
    return jwt;
  }


  resetPassword(username: string, newPassword: string): Observable<any> {
    const values = {
      username: username,
      password: newPassword
    };
    return this.http.post<any>(`${environment.serverURL}/auth/reset-password`, values );
  }

  decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }
}




