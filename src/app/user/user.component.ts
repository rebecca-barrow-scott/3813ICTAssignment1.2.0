import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';
import { UserChannelService } from '../user-channel.service';
import { MessagesService } from '../messages.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
import { ChannelObj } from '../class/channelobj';
import { formatDate } from '@angular/common';

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
  selectedFile = null;
  imagepath:string;
  testUser;
  constructor(private router:Router, 
              private userService:UserService, 
              private groupService:GroupService, 
              private channelService:ChannelService, 
              private userChannelService:UserChannelService,
              private messageService:MessagesService) { 
              }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if( this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.username = this.user.username
      this.role = this.user.role
      this.imagepath = this.user.img
      this.groups = JSON.parse(this.groupService.getLocalGroups());
      this.channels = JSON.parse(this.channelService.getLocalChannels());
      this.userChannels = JSON.parse(this.userChannelService.getLocalUserChannels());
    }
  }
  // remove all the local storage
  logout(){
    this.userService.logout();
  }
  // set the channels to be an array of user channels
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
  // reset the user collection, then logout
  resetUserCollection(){
    this.userService.setUserCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  // reset the group collection, then logout
  resetGroupCollection(){
    this.groupService.setGroupCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  // reset the userChannel collection, then logout
  resetUserChannelCollection(){
    this.userChannelService.setUserChannelCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  // reset the channel collection, then logout
  resetChannelCollection(){
    this.channelService.setChannelCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  // reset the group assist collection, then logout
  resetGroupAssistCollection(){
    this.groupService.setGroupAssistCollection().subscribe(data => {
      this.logout();
      window.location.reload();
    });
  }
  // reset the entire database, then logout
  resetDatabase(){
    this.resetChannelCollection()
    this.resetGroupCollection()
    this.resetUserChannelCollection()
    this.resetUserCollection()
    this.resetGroupAssistCollection()
    this.messageService.setMessageCollection().subscribe((data) => {});
  }
  // change the value of selected file to the name of the selected file
  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }
  // upload the image to the server
  onUpload(){
    if (this.selectedFile == null){
      alert("Select an image to upload")
    } else {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.userService.uploadImage(fd).subscribe((data)=>{
        this.imagepath = data.data.filename
        this.selectedFile = null
        this.user.fileName = this.imagepath
        this.userService.updateImg(this.user).subscribe((data)=>{
          this.userService.setUser({"username": data.user.username, "email": data.user.email, "role": data.user.role, "img": data.user.img})
        })
      }); 
    }
  }
}
