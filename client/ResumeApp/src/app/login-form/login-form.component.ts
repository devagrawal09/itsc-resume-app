import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Credentials } from '../credentials.class'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  credentials: Credentials = {
    username: '', password: ''
  }

  submitting = false

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.submitting = true
    if( !(this.credentials.username && this.credentials.password) ) {
      this.snackBar.open('One or more values missing!', 'Dismiss', {
        duration: 2000
      })
      this.submitting = false
      return;
    }
    this.auth.login(this.credentials).subscribe({
      next: res=> {
        this.snackBar.open('Logged in!', 'Dismiss', {
          duration: 2000
        })
        this.submitting = false
        this.router.navigate(['dashboard'])
      },
      error: err=> {
        this.snackBar.open('Error logging in!', 'Dismiss', {
          duration: 2000
        })
        this.submitting = false
      }
    })
    return false
  }

}
