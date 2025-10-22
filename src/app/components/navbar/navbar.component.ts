import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchTerm: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Search term:', this.searchTerm);
    // Implémentez ici la logique de recherche
  }
  isVisitor(){
    return localStorage["roles"]=="VISITER";
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
