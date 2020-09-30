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
  public initSocket(id): void {
    this.socket = io(SERVER_URL);
  }
  public send(message:string): void{
    this.socket.emit('message', message);
  }
  public onMessage(): Observable<any>{
    let observable = new Observable(observer => {
      this.socket.on('message', (data:string) => observer.next(data));
    });
    return observable;
  }
  public joinRoom(channel):void{
    this.socket.emit("joinChannel", channel);
  }
  joined(next){
    this.socket.on('joined', res=>next(res));
  }
  notice(next){
    this.socket.on('notice', res=>next(res));
  }
  getMessage(next){
    this.socket.on('message', res=>next(res));
  }
}