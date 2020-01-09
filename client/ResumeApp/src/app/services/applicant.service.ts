import { Injectable, OnInit } from '@angular/core'
import { Applicant } from '../applicant.class'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'

class ApplicantsResponse {
    applicants: Array<Applicant>
}

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  sendSecureRequest<R>(method: string, endpoint: string, body: any): Observable<R> {
    const token = this.auth.getToken()
    return this.http.request<R>(method, endpoint, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      body
    })
  }

  fetchApplicants(): Observable<ApplicantsResponse> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.sendSecureRequest<ApplicantsResponse>('GET', endpoint, {}).pipe(map(res=> {
      res.applicants.map(applicant=> {
        applicant.resume = `${environment.staticUrl}/${applicant.id}.pdf`
        return applicant
      })
      return res
    }))
  }

  deleteApplicant(selectedIds: Array<number>): Observable<number> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.sendSecureRequest<string>('DELETE', endpoint, { selectedIds }).pipe(map(res=> parseInt(res)))
  }
}
