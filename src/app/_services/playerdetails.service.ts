import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IPlayerObj} from './../_interfaces/playerObj';

@Injectable({
  providedIn: 'root'
})
export class PlayerdetailsService {

  private _getDetailsByCategoryAPI='http://localhost:3000/getDetailsByCategory';

  constructor(private http :HttpClient) { }

  getDetailsByCategory(category: string):Observable<IPlayerObj>{
    return this.http.post<IPlayerObj>(this._getDetailsByCategoryAPI, { 'category': category});    
  }


}
