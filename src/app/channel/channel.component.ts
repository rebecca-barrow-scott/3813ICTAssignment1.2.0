import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  name:string;
  message:string;
  new_message:string;
  user:any
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.name = this.route.snapshot.params.id;
    }
  }
  sendMessage(){
    this.new_message = this.message;
  }

}
