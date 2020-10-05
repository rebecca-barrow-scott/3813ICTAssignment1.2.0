import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  setMessageCollection(){
    return this.http.get<any>(this.url + 'setMessageCollection');
  }
  setLocalMessages(messages){
    localStorage.setItem("messages", JSON.stringify(messages));
  }
  getLocalMessages(){
    return localStorage.getItem("messages");
  }
  getMessages(){
    return this.http.get<any>(this.url + 'getMessages');
  }
  saveMessage(message){
    return this.http.post<any>(this.url + 'saveMessage', message);
  }
}
