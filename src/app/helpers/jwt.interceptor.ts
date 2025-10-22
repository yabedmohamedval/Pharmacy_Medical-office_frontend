import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('access_token');
    
    console.log("lala  :"+token)
     if (token) {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


    console.log("intercept");

    return next.handle(request);
  }
}
