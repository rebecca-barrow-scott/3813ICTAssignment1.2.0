import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
