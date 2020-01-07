import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Applicant } from '../applicant.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.scss']
})
export class ApplicantFormComponent implements OnInit {

  firstName = ''
  lastName = ''
  email = ''
  position = ''

  availablePositions = ['Developer', 'Tester', 'Intern', 'Support']

  submitting = false

  constructor(private applicationService: ApplicationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit(): void {
    this.submitting = true
    const applicant: Applicant = {
      id: undefined,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      position: this.position
    }
    if( !(applicant.firstName && applicant.lastName && applicant.email && applicant.position) ) {
      this.snackBar.open('One or more values missing!', 'Dismiss', {
        duration: 2000
      })
      this.submitting = false;
      return;
    }
    this.applicationService.submitApplication(applicant).subscribe({
      next: ()=> {
        console.log('Application submitted!')
        this.firstName = this.lastName = this.email = this.position = ''
        this.snackBar.open('Application Submitted!', 'Dismiss', {
          duration: 2000
        })
        this.submitting = false
      },
      error( err ) {
        console.error('Error in submitting application!')
        this.snackBar.open(`Error while trying to submit: ${err.message}`, 'Dismiss', {
          duration: 2000
        })
        this.submitting = false
      }
    });
  }

}
