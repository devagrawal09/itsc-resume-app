import { Component } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Applicant } from '../applicant.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.scss']
})
export class ApplicantFormComponent {

  availablePositions = ['Developer', 'Tester', 'Intern', 'Support']

  applicantForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required)
  })

  resume: File

  submitting = false

  constructor(private applicationService: ApplicationService, private snackBar: MatSnackBar, private router: Router) { }

  fileSelected(target) {
    const files: FileList = target.files
    if(files) {
      const file = files.item(0)
      const ext = file.name.split('.').pop()
      if(ext !== 'pdf') {
        this.snackBar.open('You can only upload pdf!', 'Dismiss', { duration: 2000 })
        target.value = ''
      }
      else this.resume = files.item(0)
    }
  }

  submit(): void {
    this.submitting = true
    const applicant: Applicant = this.applicantForm.value
    applicant.resume = this.resume
    console.log({ applicant })
    if( !(applicant.firstName && applicant.lastName && applicant.email && applicant.position && applicant.resume) ) {
      this.snackBar.open('One or more values missing!', 'Dismiss', {
        duration: 2000
      })
      this.submitting = false;
      return;
    }
    const applicantFormData = new FormData()
    applicantFormData.append('firstName', applicant.firstName)
    applicantFormData.append('lastName', applicant.lastName)
    applicantFormData.append('email', applicant.email)
    applicantFormData.append('position', applicant.position)
    applicantFormData.append('resume', applicant.resume, applicant.resume.name)
    console.log(applicantFormData)
    this.applicationService.submitApplication(applicantFormData).subscribe({
      next: (event)=> {
        if ( event.type === HttpEventType.Response ) {
          console.log('Application submitted!')
          this.snackBar.open('Application Submitted!', 'Dismiss', {
            duration: 2000
          })
          this.submitting = false
          this.router.navigate(['']);
        }
      },
      error: (err)=> {
        console.error('Error in submitting application!')
        this.snackBar.open(`Error while trying to submit: ${err.message}`, 'Dismiss', {
          duration: 2000
        })
        this.submitting = false
      }
    });
  }

}
