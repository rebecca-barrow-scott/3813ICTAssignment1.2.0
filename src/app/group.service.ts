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
  setGroupCollection(){
    return this.http.get<any>(this.url + 'setGroupCollection');
  }
  getGroups(){
    return this.http.get<any>(this.url + 'getGroups');
  }
}
