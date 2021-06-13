import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get(url){
    return this.http.get(url)
  }

}
