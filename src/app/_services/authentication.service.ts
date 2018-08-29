import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IAuthObj} from './../_interfaces/authObj';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loginAPI="http://localhost:3000/login"

  constructor(private http :HttpClient) { }


  login(username: string, password: string): Observable<IAuthObj>{
    return this.http.post<IAuthObj>(this._loginAPI, { 'username': username, 'password': password });

  }

  getToken() :string{
    return localStorage.getItem("currentUser");
  }
}
