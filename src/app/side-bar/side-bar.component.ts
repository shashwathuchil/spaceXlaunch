import { Component, OnInit } from '@angular/core';
import { FilterDataService } from "../services/filter-data.service";
import { DataService } from "../services/data.service";
import { UrlService } from "../services/url.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(
    public filData: FilterDataService,
    public dataSvc: DataService,
    public urlSvc: UrlService
  ) { }

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
    } else if (this.filData.activeYear === "" && (this.filData.launchStatus || !this.filData.launchStatus)) {
      return this.urlSvc.GET_FILTER_LAUNCH + String(Boolean(this.filData.launchStatus));
    } else if (this.filData.activeYear === "" && (this.filData.landStatus || !this.filData.landStatus)) {
      return this.urlSvc.GET_FILTER_LAND + String(Boolean(this.filData.landStatus));
    } else{
      return this.urlSvc.GET_FILTER_YEAR + "launch_success=" + String(Boolean(this.filData.launchStatus)) + "&land_success=" + String(Boolean(this.filData.landStatus)) + "&launch_year=" + String(this.filData.activeYear);

    }
  }

  filterDataCall() {
    let url = this.getUrl()
    this.dataSvc.get(url).subscribe(data => {
      this.filData.allLaunches = data;
    })

  }

}
