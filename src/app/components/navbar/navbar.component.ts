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
  role = localStorage.getItem('roles') || '';
  username = localStorage.getItem('username') || '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Exemple: rediriger vers une page de résultats
    // this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    console.log('Search term:', this.searchTerm);
  }
  isVisitor(){
    return  this.role === "VISITOR";
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
