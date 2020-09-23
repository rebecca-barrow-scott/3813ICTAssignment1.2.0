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
  setUserChannelCollection(){
    return this.http.get<any>(this.url + 'setUserChannelCollection');
  }
  getUserChannels(user){
    return this.http.post<any>(this.url + 'getUserChannels', user);
  }
}
