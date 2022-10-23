import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private htpp:HttpClient) { }

  baseUrl="https://localhost:7134/api/login/login";
  regUrl="https://localhost:7134/api/login";

  login(user:User):Observable<string>
  {
    return this.htpp.post<string>(this.baseUrl,user);
  }
  registration(user:User):Observable<User>
  {
    return this.htpp.post<User>(this.regUrl,user);
  }

}
