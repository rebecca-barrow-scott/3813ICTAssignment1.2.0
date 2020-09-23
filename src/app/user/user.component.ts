import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';
import { UserChannelService } from '../user-channel.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
import { ChannelObj } from 'E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\src\\app\\class\\channelobj';

const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username:string;
  role:string;
  user:any;
  userobj = new UserObj();
  channelobj = new ChannelObj();
  feedback:string = "";
  group_array:any;
  channel_array:any;
  all_channel_users:any;
  channel_users:any;
  channels:any;
  groups:any;
  userChannels:any;
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if( this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.username = this.user.username
      this.role = this.user.role
      this.groups = JSON.parse(this.groupService.getLocalGroups());
      this.channels = JSON.parse(this.channelService.getLocalChannels());
      this.userChannels = JSON.parse(this.userChannelService.getLocalUserChannels());
    }
  }
  logout(){
    this.userService.logout();
  }

  // createChannel(id){
  //   if(this.user.role == "Super Admin" || this.user.role == "Group Admin"){
  //     var name = prompt("Please enter a channel name");
  //     this.channelobj.name = name
  //     this.channelobj.group_id = id
  //     this.httpClient.post(BACKEND_URL + '/createChannel', this.channelobj, httpOptions)
  //     .subscribe((data: any) => {
  //       if (data.feedback == null){
  //         window.location.reload();
  //       } else {
  //         this.feedback = data.feedback
  //       }
  //     });
  //   } else {
  //     alert("Incorrect permission")
  //   }
  sortChannels(){
    var channels = []
    var refined_channels = []
    for (let channel_user of this.all_channel_users){
      if (channel_user.user_id == this.user.username){
        channels.push(channel_user.channel_id)
      }
    }
    for(let channel of this.channel_array){
      for(let id of channels){
        if(channel.id == id){
          refined_channels.push(channel)
        }
      }
    }
    return refined_channels
  }

  resetUserCollection(){
    this.userService.setUserCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  resetGroupCollection(){
    this.groupService.setGroupCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  resetUserChannelCollection(){
    this.userChannelService.setUserChannelCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  resetChannelCollection(){
    this.channelService.setChannelCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
}
