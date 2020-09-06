import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserGroupObj } from '../class/usergroupobj';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  id:any;
  userGroupObj = new UserGroupObj()
  feedback:string;
  username:string
  channel_array = [{"name": "Channel 1.1"}];
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = {"id": this.route.snapshot.params.id};
    this.httpClient.post(BACKEND_URL + '/getChannel', this.id, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        this.channel_array = data.channels;
      } else {
        this.feedback = data.feedback;
      }
    });
  }
  searchUser(){
    this.userGroupObj.username = this.username
    this.userGroupObj.group_id = this.id
    this.httpClient.post(BACKEND_URL + '/searchUser', this.userGroupObj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        window.location.reload();
      } else {
        this.feedback = data.feedback
      }
    });
  }

}
