import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  public GET_ALL = "https://api.spacexdata.com/v3/launches?limit=100";

  constructor() { }
}
