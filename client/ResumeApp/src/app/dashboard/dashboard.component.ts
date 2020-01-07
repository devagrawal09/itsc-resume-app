import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantService } from '../services/applicant.service';
import { Applicant } from '../applicant.class';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular

  applicants: Array<Applicant>

  columnDefs = [
    {  field: 'id', checkboxSelection: true },
    {  field: 'firstName', sortable: true, filter: true },
    {  field: 'lastName', sortable: true, filter: true },
    {  field: 'email', sortable: true, filter: true },
    {  field: 'position', sortable: true, filter: true }
  ]

  constructor(private applicantService: ApplicantService) { }

  ngOnInit() {
    this.applicantService.fetchApplicants().subscribe(res=> {
      this.applicants = res.applicants
      console.log(this.applicants)
    })
  }

  deleteSelectedApplicants() {
    const selectedData: Array<Applicant> = this.agGrid.api.getSelectedNodes().map(node => node.data)
    const selectedIds = selectedData.map(applicant=> parseInt(applicant.id))
    this.applicantService.deleteApplicant(selectedIds).subscribe(res=> {
      console.log('Deleted!')
    })
  }

}
