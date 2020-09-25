import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  setLocalChannels(channels){
    localStorage.setItem("channels", JSON.stringify(channels));
  }
  getLocalChannels(){
    return localStorage.getItem("channels");
  }
  setChannelCollection(){
    return this.http.get<any>(this.url + 'setChannelCollection');
  }
  getChannels(){
    return this.http.get<any>(this.url + 'getChannels');
  }
  createChannel(channel){
    return this.http.post<any>(this.url + 'createChannel', channel)
  }
  validateChannel(channel){
    return this.http.post<any>(this.url + 'validateChannel', channel)
  }
  deleteChannel(channel){
    return this.http.post<any>(this.url + 'deleteChannel', channel);
  }
}
