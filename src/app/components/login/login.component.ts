import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user?: User;
  username = '';
  password = '';
  showErr = false;
  roles: any = [];

  constructor(private authService: AuthService, private router: Router) {}

  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {}

  loginProcess(): void {
    if (this.formGroup.valid) {
      const user = this.formGroup.get('username')?.value.trim();
      const password = this.formGroup.get('password')?.value;
      this.authService.login(user, password).subscribe({
        next: (res) => {
          console.log('JWT:', res);
          const userInfo = this.authService.decodeToken(res);
          this.roles = userInfo.roles;
          localStorage.setItem('roles', this.roles[0]);
          localStorage.setItem('username', user);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
          this.showErr = true;
        }
      });
    }
  }

  loginAsVisitor(): void {
    const visitorUsername = 'visitor';
    const visitorPassword = '8080uiabd'; // replace with the actual password for the visitor account
    this.authService.login(visitorUsername, visitorPassword).subscribe({
      next: (res) => {
        const userInfo = this.authService.decodeToken(res);
        this.roles = userInfo.roles;
        localStorage.setItem('roles', this.roles[0]);
        localStorage.setItem('username', visitorUsername);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
        this.showErr = true;
      }
    });
  }
}
