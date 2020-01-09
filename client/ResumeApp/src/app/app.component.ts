import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn()
  }

  logout(): void {
    this.auth.logout()
    this.snackBar.open('Logged out!', 'Dismiss', {
      duration: 2000
    })
    this.router.navigate(['login'])
  }

  welcomeText() {
    if(this.auth.isLoggedIn())
      return 'Welcome manager!'
    else
      return 'Welcome to ResumeApp!'
  }

}
