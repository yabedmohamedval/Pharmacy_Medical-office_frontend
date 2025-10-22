import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,ActivatedRoute, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) { this.router.navigate(['/login']); return false; }

    const payload = this.authService.decodeToken(token);
    const userRoles: string[] = (payload?.roles ?? []).map((r: string) =>
      r.startsWith('ROLE_') ? r : `ROLE_${r}`
    );

    const allowed: string[] | undefined = route.data?.['allowedRoles'];
    if (!allowed || allowed.length === 0) {
      // pas de contrainte -> juste authentifié
      return true;
    }

    // normalise aussi les roles attendus
    const needed = allowed.map(r => r.startsWith('ROLE_') ? r : `ROLE_${r}`);
    const ok = needed.some(r => userRoles.includes(r));
    if (!ok) {
      this.router.navigate(['/login']);
    }
    return ok;
  }

}
