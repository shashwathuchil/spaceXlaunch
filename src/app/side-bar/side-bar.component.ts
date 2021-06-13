import { Component, OnInit, Input } from '@angular/core';
import { FilterDataService } from "../services/filter-data.service";
import { DataService } from "../services/data.service";
import { UrlService } from "../services/url.service";

import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">There are no results for this filter</h4>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Please reset the filter</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="close()">Reset</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    public filData: FilterDataService,
    public dataSvc: DataService,
    public urlSvc: UrlService,
    ) { }
  close(){
    this.activeModal.dismiss('Cross click')
    this.dataSvc.get(this.urlSvc.GET_ALL).subscribe((data:any)=>{
      this.filData.allLaunches = data;
      this.filData.activeYear = "";
      this.filData.landStatus = undefined;
      this.filData.launchStatus = undefined;
    })
  }
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class SideBarComponent implements OnInit {

  constructor(
    public filData: FilterDataService,
    public dataSvc: DataService,
    public urlSvc: UrlService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    let a = []
    let currentYear = new Date().getFullYear();
    for (let i = Number(this.filData.filterYear[0]); i <= currentYear; i++) {
      a.push(String(i));
    }
    this.filData.filterYear = a;
    console.log(this.filData.filterYear);
  }
  filterYear(year) {
    this.filData.activeYear = year;
    this.filterDataCall();
  }
  filterLaunch(status) {
    this.filData.launchStatus = status;
    this.filterDataCall();
  }
  filterLand(status) {
    this.filData.landStatus = status;
    this.filterDataCall();
  }
  getUrl() {
    if (this.filData.activeYear !== "" && this.filData.launchStatus !== undefined && this.filData.landStatus !== undefined) {
      return this.urlSvc.GET_FILTER_YEAR + "launch_success=" + this.filData.launchStatus + "&land_success=" + this.filData.landStatus + "&launch_year=" + String(this.filData.activeYear);
    } else if (this.filData.activeYear !== "" && this.filData.launchStatus === undefined && this.filData.landStatus === undefined) {
      return this.urlSvc.GET_FILTER_YEAR + "&launch_year=" + String(this.filData.activeYear)
    } else if (this.filData.activeYear === "" && (this.filData.launchStatus || !this.filData.launchStatus) && this.filData.landStatus === undefined) {
      return this.urlSvc.GET_FILTER_LAUNCH + String(Boolean(this.filData.launchStatus));
    } else if (this.filData.activeYear === "" && (this.filData.landStatus || !this.filData.landStatus) && this.filData.launchStatus === undefined) {
      return this.urlSvc.GET_FILTER_LAND + String(Boolean(this.filData.landStatus));
    } else if (this.filData.activeYear === "") {
      return this.urlSvc.GET_FILTER_YEAR + "launch_success=" + String(Boolean(this.filData.launchStatus)) + "&land_success=" + String(Boolean(this.filData.landStatus));
    } else {
      return this.urlSvc.GET_FILTER_YEAR + "launch_success=" + String(Boolean(this.filData.launchStatus)) + "&land_success=" + String(Boolean(this.filData.landStatus)) + "&launch_year=" + String(this.filData.activeYear);
    }
  }

  filterDataCall() {
    let url = this.getUrl()
    this.dataSvc.get(url).subscribe((data: any) => {
      this.filData.allLaunches = data;
      if (!data.length) {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'World';
      }
    })

  }

}
