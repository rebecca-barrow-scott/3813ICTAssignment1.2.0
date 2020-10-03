import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { SocketService } from '../socket.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
import { GroupObj } from '../class/groupobj';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';
import { ChannelObj } from '../class/channelobj';
import { ChannelUser } from '../class/channeluser';
import { NgSelectOption } from '@angular/forms';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel_id:number;
  message:string;
  new_message:string;
  user:any
  groups:any
  currentGroup = new GroupObj();
  channels:any
  currentChannel = new ChannelObj();
  userChannel = new ChannelUser();
  currentGroupAssist = false;
  groupAssists:any;
  selectedFile = null;
  imagepath:string;

  messagecontent:string
  messages = []
  ioConnection:any
  currentRoom:any
  roomnotice:string
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute, private socketService:SocketService, private groupService:GroupService, private channelService:ChannelService) { }

  ngOnInit(){
    this.user = JSON.parse(this.userService.getUser());
    this.userChannel.user_id = this.user.username
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.channel_id = this.route.snapshot.params.id;
      this.userChannel.channel_id = this.channel_id
      this.groups = JSON.parse(this.groupService.getLocalGroups());
      this.channels = JSON.parse(this.channelService.getLocalChannels());
      this.currentChannel = this.findChannel();
      this.currentGroup = this.findGroup();
      this.groupAssists = JSON.parse(this.groupService.getLocalGroupAssists());
      this.checkCurrentGroupAssist();
      //socket
      this.socketService.initSocket();
      this.joinChannel();
      this.socketService.notice((msg)=>{ this.messages.push({'msg': msg, 'user': null}) })
      this.socketService.joined((msg)=>{ this.currentRoom = msg })
      this.socketService.getMessage((msg)=>{ 
        this.messages.push({'msg': msg.msg, 'user': msg.user.username, 'img':msg.user.img, 'attachment':msg.attachment});
      })
    }
  }
  findChannel(){
    for(let channel of this.channels){
      if(channel.id == this.channel_id){
        return channel
      }
    }
  }
  findGroup(){
    for(let group of this.groups){
      if(group.id == this.currentChannel.group_id){
        return group
      }
    }
  }

  initIonConnection(){
    this.socketService.initSocket();
  }

  chat(){
    if(this.messagecontent){
      if(this.selectedFile != null){
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.userService.uploadImage(fd).subscribe((data)=>{
          this.imagepath = data.data.filename
          this.selectedFile = null
          this.socketService.send({'msg': this.messagecontent, 'user': this.user, 'img': this.imagepath});
          this.messagecontent=null;
        }); 
      } else {
        this.socketService.send({'msg': this.messagecontent, 'user': this.user, 'img': null});
        this.messagecontent=null;
      }
     

    } else {
      console.log("no message");
    }
  }
  leaveChannel(){
    this.socketService.leaveChannel(this.userChannel)
    this.messages = []
    this.router.navigateByUrl('/group/'+this.currentGroup.id)
  }
  joinChannel(){
    this.socketService.joinRoom(this.userChannel)
  }
  checkCurrentGroupAssist(){
    for(let groupAssist of this.groupAssists){
      if(groupAssist.group_id == this.currentGroup.id && groupAssist.user_id == this.user.username){
        this.currentGroupAssist = true
      }
    }
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }

}
