import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserChannelService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  setLocalUserChannels(userChannels){
    localStorage.setItem("userChannels", JSON.stringify(userChannels));
  }
  setLocalAllUserChannels(userChannels){
    localStorage.setItem("allUserChannels", JSON.stringify(userChannels));
  }
  getLocalUserChannels(){
    return localStorage.getItem("userChannels");
  }
  getLocalAllUserChannels(){
    return localStorage.getItem("allUserChannels");
  }
  setUserChannelCollection(){
    return this.http.get<any>(this.url + 'userChannel/setUserChannelCollection');
  }
  getUserChannels(user){
    return this.http.post<any>(this.url + 'userChannel/getUserChannels', user);
  }
  getAllUserChannels(){
    return this.http.get<any>(this.url + 'userChannel/getAllUserChannels');
  }
  removeChannel(channel){
    return this.http.post<any>(this.url + 'userChannel/removeChannel', channel);
  }
  addUserChannel(userChannel){
    return this.http.post<any>(this.url + 'addUserChannel', userChannel);
  }
  removeUserChannel(userChannel){
    return this.http.post<any>(this.url + "removeUserChannel", userChannel);
  }
  changeRole(userGroup){
    return this.http.post<any>(this.url + 'changeUserChannelRole', userGroup);
  }
}
