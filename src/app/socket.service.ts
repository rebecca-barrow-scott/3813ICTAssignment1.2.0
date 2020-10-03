import { Injectable } from '@angular/core';
import { Observable, onErrorResumeNext } from 'rxjs';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000/group';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }
  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }
  joinRoom(userChannel):void{
    this.socket.emit("joinChannel", userChannel);
  }
  joined(next){
    this.socket.on('joined', res=>next(res));
  }
  notice(next){
    this.socket.on('notice', res=>next(res));
  }
  send(message:string): void{
    this.socket.emit('message', message);
  }
  getMessage(next){
    this.socket.on('message', message=>next(message));
  }
  reqActiveUsers(userChannel){
    this.socket.emit('activeUsers', userChannel);
  }
  getActiveUsers(next){
    this.socket.on('activeUsers', res=>next(res));
  }
  leaveChannel(userChannel){
    this.socket.emit('leaveChannel', userChannel);
  }
  addChannel(channel_id){
    this.socket.emit('addChannel', channel_id);
  }
  removeChannel(channel_id){
    alert('yes')
    this.socket.emit('removeChannel', channel_id);
  }
}