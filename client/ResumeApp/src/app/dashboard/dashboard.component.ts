import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantService } from '../services/applicant.service';
import { Applicant } from '../applicant.class';
import { AgGridAngular } from 'ag-grid-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular

  applicants: Array<Applicant>

  columnDefs = [
    { field: 'id', sortable: true, checkboxSelection: true },
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'position', sortable: true, filter: true },
    { field: 'resume', cellRenderer(data) {
        return `<a href=${data.value} target="_blank">Download Resume</a>`
    } }
  ]

  constructor(private applicantService: ApplicantService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.applicantService.fetchApplicants().subscribe(res=> {
      this.applicants = res.applicants
    })
  }

  deleteSelectedApplicants() {
    const selectedData: Array<Applicant> = this.agGrid.api.getSelectedNodes().map(node => node.data)
    const selectedIds = selectedData.map(applicant=> parseInt(applicant.id))
    if( !selectedIds.length ) {
      this.snackBar.open('No applicant selected!', 'Dismiss', {
        duration: 2000
      })
      return
    }
    this.applicantService.deleteApplicant(selectedIds).subscribe(res=> {
      this.snackBar.open(`Deleted ${res} applicants`, 'Dismiss', {
        duration: 2000
      })
      this.applicantService.fetchApplicants().subscribe(res=> {
        this.applicants = res.applicants
        console.log(this.applicants)
      })
    })
  }

}
