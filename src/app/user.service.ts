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
    localStorage.removeItem("groups");
    localStorage.removeItem("channels");
    localStorage.removeItem("userChannels");
    localStorage.removeItem("groupAssists");
    localStorage.removeItem("allUserChannels");
    localStorage.removeItem("messages");
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
  deleteAllUsers(){
    return this.http.get<any>(this.url + 'deleteAllUsers');
  }
  validateUser(user){
    return this.http.post<any>(this.url + 'validateUser', user);
  }
  createUser(user){
    return this.http.post<any>(this.url + 'createUser', user);
  }
  changeUserRole(user){
    return this.http.post<any>(this.url + 'changeUserRole', user);
  }
  uploadImage(fd){
    return this.http.post<any>(this.url + 'imageUpload', fd);
  }
  updateImg(user){
    return this.http.post<any>(this.url + 'updateImg', user);
  }
}
