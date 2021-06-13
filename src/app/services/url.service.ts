import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  public GET_ALL = "launches?limit=100";
  public GET_FILTER_YEAR = "launches?limit=100&";
  public GET_FILTER_LAUNCH = "launches?limit=100&launch_success=";
  public GET_FILTER_LAND = "launches?limit=100&land_success=";

  constructor() { }
}
