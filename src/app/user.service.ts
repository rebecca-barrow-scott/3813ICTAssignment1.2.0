import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  setUser(user){
   var JSONusers_array = ""
    JSONusers_array = JSON.stringify(user)
    localStorage.setItem("user", JSONusers_array);
  }
  getUser(){
    return localStorage.getItem("user");
  }
  logout(){
    localStorage.removeItem("user");
  }

  authUser(user){
    return this.http.post<any>(this.url + 'api/auth', user);
  }
  setUserCollection(){
    return this.http.get<any>(this.url + 'setUserCollection');
  }
  getAllUsers(){
    return this.http.get<any>(this.url + 'getAllUsers');
  }
}
