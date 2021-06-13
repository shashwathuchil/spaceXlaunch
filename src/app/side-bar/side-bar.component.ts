import { Component, OnInit } from '@angular/core';
import { FilterDataService } from "../services/filter-data.service"

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public filData: FilterDataService) { }

  ngOnInit(): void {
    let a =[]
    let currentYear = new Date().getFullYear();
    for(let i=Number(this.filData.filterYear[0]);i<= currentYear;i++){
      a.push(String(i));
    }
    this.filData.filterYear = a;
    console.log(this.filData.filterYear);
  }
  filterYear(year){
    this.filData.activeYear = year;
  }
  filterLaunch(status){
    this.filData.launchStatus = status;
  }
  filterLand(status){
    this.filData.landStatus = status;
  }

}
