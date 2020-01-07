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
    return this.http.get<ApplicantsResponse>(endpoint)
  }

  deleteApplicant(selectedIds: Array<number>): Observable<null> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.http.request<null>('DELETE', endpoint, {
      body: { selectedIds }
    })
  }
}
