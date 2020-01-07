import { Injectable } from '@angular/core';
import { Applicant } from '../applicant.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  submitApplication(applicant: Applicant): Observable<any> {
    const endpoint = `${environment.apiUrl}/applicant`
    return this.http.post(endpoint, { applicant })
  }
}
