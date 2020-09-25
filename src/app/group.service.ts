import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  setLocalGroups(groups){
    localStorage.setItem("groups", JSON.stringify(groups));
  }
  setLocalGroupAssists(groupAssists){
    localStorage.setItem("groupAssists", JSON.stringify(groupAssists));
  }
  getLocalGroups(){
    return localStorage.getItem("groups");
  }
  getLocalGroupAssists(){
    return localStorage.getItem("groupAssists");
  }
  setGroupCollection(){
    return this.http.get<any>(this.url + 'setGroupCollection');
  }
  setGroupAssistCollection(){
    return this.http.get<any>(this.url + 'setGroupAssistCollection');
  }
  getGroups(){
    return this.http.get<any>(this.url + 'getGroups');
  }
  getGroupAssists(){
    return this.http.get<any>(this.url + 'getGroupAssists');
  }
  createGroup(group){
    return this.http.post<any>(this.url + 'createGroup', group);
  }
  validateGroup(group){
    return this.http.post<any>(this.url + 'validateGroup', group);
  }
  getGroup(id){
    return this.http.post<any>(this.url + 'getGroup', id);
  }
  deleteGroup(group){
    return this.http.post<any>(this.url + 'deleteGroup', group);
  }
  removeGroup(group){
    return this.http.post<any>(this.url + 'removeGroup', group)
  }
}
