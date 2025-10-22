import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MedicalOfficeListComponent } from './components/medical-office-list/medical-office-list.component';
import { MedicalOfficeDetailsComponent } from './components/medical-office-details/medical-office-details.component';
import { CreateMedicalOfficeComponent } from './components/create-medical-office/create-medical-office.component'

import { PharmacyListComponent } from './components/pharmacy-list/pharmacy-list.component';
import { PharmacyDetailsComponent } from './components/pharmacy-details/pharmacy-details.component';
import { CreatePharmacyComponent } from './components/create-pharmacy/create-pharmacy.component';


const routes: Routes = [
  {path:'',redirectTo:'/login' , pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:"reset-password",component:ResetPasswordComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},
  { path: 'create-medical-office', component: CreateMedicalOfficeComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] }},
  { path: 'medical-offices', component: MedicalOfficeListComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},
  { path: 'medical-offices/:id', component: MedicalOfficeDetailsComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},

  { path: 'pharmacies', component: PharmacyListComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},
  { path: 'pharmacies/:id', component: PharmacyDetailsComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN','VISITER'] }},
  { path: 'create-pharmacy', component: CreatePharmacyComponent , canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
