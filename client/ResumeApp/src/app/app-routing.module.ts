import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantFormComponent } from './applicant-form/applicant-form.component';


const routes: Routes = [
  { path: 'apply', component: ApplicantFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
