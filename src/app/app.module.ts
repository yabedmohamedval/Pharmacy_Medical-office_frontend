import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { NavbarComponent } from "./components/navbar/navbar.component";
// Interceptors
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { MedicalOfficeListComponent } from './components/medical-office-list/medical-office-list.component';
import { MedicalOfficeDetailsComponent } from './components/medical-office-details/medical-office-details.component';
import { HomeComponent } from './components/home/home.component';
import { CreateMedicalOfficeComponent } from './components/create-medical-office/create-medical-office.component';
import { PharmacyListComponent } from './components/pharmacy-list/pharmacy-list.component';
import { PharmacyDetailsComponent } from './components/pharmacy-details/pharmacy-details.component';
import { CreatePharmacyComponent } from './components/create-pharmacy/create-pharmacy.component';

// Material Modules

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavbarComponent,
    MedicalOfficeListComponent,
    MedicalOfficeDetailsComponent,
    HomeComponent,
    CreateMedicalOfficeComponent,
    PharmacyListComponent,
    PharmacyDetailsComponent,
    
    CreatePharmacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


