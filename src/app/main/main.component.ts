import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service"
import { UrlService } from "../services/url.service"
import { FilterDataService } from "../services/filter-data.service"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public allLaunches:any=[];
  public lazyimg = "../../assets/img/lazy.png";
  constructor(
    public dataSvc: DataService,
    public url: UrlService,
    public filData: FilterDataService
    ) { }

  ngOnInit(): void {
    this.dataSvc.get(this.url.GET_ALL).subscribe((data:any)=>{
      console.log(data);
      this.allLaunches = data
      this.filData.allLaunches = data
    })
  }



}
