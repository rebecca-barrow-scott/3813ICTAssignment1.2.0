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
  getLocalUserChannels(){
    return localStorage.getItem("userChannels");
  }
  setUserChannelCollection(){
    return this.http.get<any>(this.url + 'userChannel/setUserChannelCollection');
  }
  getUserChannels(user){
    return this.http.post<any>(this.url + 'userChannel/getUserChannels', user);
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
