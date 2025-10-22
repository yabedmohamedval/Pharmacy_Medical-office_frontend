import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  notMatch = false;
  username: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  resetPassword(form: NgForm) {
    if (this.newPassword === this.confirmPassword) {
      const decoded = this.authService.decodeToken(localStorage.getItem('access_token')??'');
      this.username=decoded.sub;

      this.authService.resetPassword(this.username, this.newPassword)
      .subscribe({
        next : (res) => {
          // Redirection vers la page d'accueil après la réinitialisation du mot de passe
          this.router.navigate(['/home']);
        },
        error : (err) => {
          console.log(err);
        }
      })
    } else {
      this.notMatch = true;
      console.log('Passwords do not match');
    }
  }

}
