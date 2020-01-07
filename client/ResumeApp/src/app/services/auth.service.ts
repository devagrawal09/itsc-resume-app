import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Credentials } from '../credentials.class'
import { environment } from 'src/environments/environment'
import { tap } from 'rxjs/operators'

class LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey = 'resumeapp-auth-token'

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<LoginResponse> {
    const endpoint = `${environment.apiUrl}/login`
    return this.http.post<LoginResponse>(endpoint, { credentials }).pipe(tap(
      res=> {
        localStorage.setItem(this.storageKey, res.token)
      }
    ))
  }

  logout(): Observable<null> {
    const token = localStorage.getItem(this.storageKey)
    const credentials = { token }
    const endpoint = `${environment.apiUrl}/logout`
    return this.http.post<null>(endpoint, { credentials }).pipe(tap(
      ()=> {
        localStorage.removeItem(this.storageKey)
      }
    ))
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.storageKey)
    return !!token
  }
}
