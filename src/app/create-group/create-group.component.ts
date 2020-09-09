import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { GroupObj } from '../class/groupobj';
import { ChannelObj } from 'E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\src\\app\\class\\channelobj';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  feedback:string;
  group:string;
  channel:string = 'Channel 1'
  groupobj = new GroupObj()
  channelobj = new ChannelObj()
  user:any;
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    }
    if(this.user.role == 'Super Admin' || this.user.role == 'Group Admin'){
    } else {
      this.router.navigateByUrl('user');
    }
  }
  createGroup(){
    this.groupobj.name = this.group

    this.httpClient.post(BACKEND_URL + '/createGroup', this.groupobj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        var group = data.group
        this.createChannel(group.id)
      } else {
        this.feedback = data.feedback
      }
    });
  }
  createChannel(id){
    this.channelobj.name = this.channel
    this.channelobj.group_id = id
    this.httpClient.post(BACKEND_URL + '/createChannel', this.channelobj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        this.router.navigateByUrl('group/'+id);
      } else {
        this.feedback = data.feedback
      }
    });
  }

}
