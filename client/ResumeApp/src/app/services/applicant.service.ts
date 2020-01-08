import { Injectable, OnInit } from '@angular/core'
import { Applicant } from '../applicant.class'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'

class ApplicantsResponse {
    applicants: Array<Applicant>
}

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  fetchApplicants(): Observable<ApplicantsResponse> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.http.get<ApplicantsResponse>(endpoint).pipe(map(res=> {
      res.applicants.map(applicant=> {
        applicant.resume = `${environment.staticUrl}/${applicant.id}.pdf`
        return applicant
      })
      return res
    }))
  }

  deleteApplicant(selectedIds: Array<number>): Observable<number> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.http.request<string>('DELETE', endpoint, {
      body: { selectedIds }
    }).pipe(map(res=> parseInt(res)))
  }
}
