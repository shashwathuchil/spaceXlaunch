import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  public filterYear: any = ["2006"]
  public activeYear:string=""
  public launchStatus:Boolean;
  public landStatus:Boolean;
  constructor() {

  }
}
