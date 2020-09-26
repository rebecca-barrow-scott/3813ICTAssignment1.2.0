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
import { GroupObj } from '../class/groupobj';
import { ChannelObj } from '../class/channelobj';
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
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService) { }

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
    this.groupService.validateGroup(this.groupobj).subscribe(data => {
      var group = data.group
      if (data.feedback == null){
        this.groupService.createGroup(data.group).subscribe(data => {
          if (data.feedback == null){
            this.createChannel(group.id)
          } else {
            this.feedback = data.feedback
          }
        });
      } else {
        this.feedback = data.feedback
      }
    });
  }

  createChannel(id){
    this.channelobj.name = this.channel
    this.channelobj.group_id = id
    this.channelService.validateChannel(this.channelobj).subscribe((data)=>{
      if (data.feedback == null){
        this.channelobj.id = data.channel.id
        this.channelService.createChannel(this.channelobj).subscribe(data => {
          if (data.feedback == null){
            this.setLocalStorage()
            this.router.navigateByUrl('group/'+id);
          } else {
            this.feedback = data.feedback
          }
        });
      } else {
        this.feedback = data.feedback
      }
    });
    
  }
  setLocalStorage(){
    this.groupService.getGroups().subscribe((data)=>{
      if (data.feedback == null){
        this.groupService.setLocalGroups(data.groups);
      }
    });
    this.userChannelService.getUserChannels(this.user).subscribe((data)=>{
      if (data.feedback == null){
        this.userChannelService.setLocalUserChannels(data.userChannels);
      }
    });
    this.channelService.getChannels().subscribe((data)=>{
      if (data.feedback == null){
        this.channelService.setLocalChannels(data.channels);
      }
    });
  }
}
