import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';
import { UserChannelService } from '../user-channel.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserGroupObj } from '../class/usergroupobj';
import { UserObj } from '../class/userobj';
import { ChannelUser } from '../class/channeluser';
import { ChannelObj } from '../class/channelobj';
import { GroupObj } from '../class/groupobj';
import { SocketService } from '../socket.service';

const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  id:any;
  user:any;
  groups:any;
  channels:any;
  userChannels:any;
  allUserChannels:any;
  groupChannelDict:{};
  currentGroup = new GroupObj();
  groupobj = new GroupObj();
  users:any;
  groupAssists:any;
  channelobj = new ChannelObj();
  channelUser = new ChannelUser();
  userGroupObj = new UserGroupObj();
  currentGroupAssist = false;
  
  ioConnection:any
  messages=[]
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService, private socketService:SocketService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.groupobj.id = this.route.snapshot.params.id;
      this.groupService.getGroup(this.groupobj).subscribe((data)=>{
        this.currentGroup = data.groups
      });
      this.groups = JSON.parse(this.groupService.getLocalGroups());
      this.channels = JSON.parse(this.channelService.getLocalChannels());
      this.userChannels = JSON.parse(this.userChannelService.getLocalUserChannels());
      this.allUserChannels = JSON.parse(this.userChannelService.getLocalAllUserChannels());
      this.groupAssists = JSON.parse(this.groupService.getLocalGroupAssists());
      this.groupChannelDict = this.sortGroupChannels();
      this.userService.getAllUsers().subscribe((data)=>{
        this.users = data.users
      })
      this.checkCurrentGroupAssist()
      this.socketService.initSocket();
    }
  }
  // sort the channels into a disctonary where the key is a group_id and the value is an array of 
  // channel objects
  sortGroupChannels(){
    var gcdict ={}
    for(let group of this.groups){
      for(let channel of this.channels){
        if(group.id == channel.group_id){
          if(group.id in gcdict){
            gcdict[group.id].push(channel)
          } else {
            gcdict[group.id] = [channel]
          }
        }
      }
    }
    return gcdict
  }
  // delete the user channels and the channel based on the channel selected. Also update the local
  // storage to to reflect the changes
  removeChannel(id, name){
    if(confirm("Are you sure you would like to delete " + name + "?")){
      this.channelobj.id = id
      this.userChannelService.removeChannel(this.channelobj).subscribe((data)=>{
        if (data.feedback == null){
          this.userChannelService.setLocalUserChannels(data.userChannels)
          this.channelService.deleteChannel(this.channelobj).subscribe((data)=>{
            if(data.feedback == null){
              this.channelService.setLocalChannels(data.channels);
              this.socketService.removeChannel(this.channelobj.id);
              window.location.reload();
            }
          })
        }
      })
    }
  }
  // delete the group from the database and update local storage to reflect this
  deleteGroup(){
    if(confirm("Are you sure you would like to delete " + this.currentGroup.name + "?")){
      this.groupService.removeGroup(this.groupobj).subscribe((data)=>{
        if (data.feedback == null){
          this.groupService.setLocalGroupAssists(data.groupAssists)
          this.groupService.deleteGroup(this.groupobj).subscribe((data)=>{
            if (data.feedback == null){
              this.groupService.setLocalGroups(data.groups);
              this.router.navigateByUrl('user');
            }
          })
        }
      })
    }
  }
  // remove a user from the specified channel
  removeUserChannel(channel_id, user_id){
    this.channelUser.channel_id = channel_id
    this.channelUser.user_id = user_id
    if(confirm("Remove user from the channel")){
      this.userChannelService.removeUserChannel(this.channelUser).subscribe((data)=>{
        if(data.feedback == null){
          this.userChannelService.setLocalUserChannels(data.userChannels);
          window.location.reload();
        } else {
          alert("Error")
        }
        
      })
    }
  }
  // make the selected user a group assistant 
  changeRoleGroup(user_id){
    var tempChannelArray = []
    this.userGroupObj.username = user_id
    this.userGroupObj.group_id = this.currentGroup.id
    for(let c of this.channels){
      if(c.group_id == this.currentGroup.id){
        tempChannelArray.push(c)
      }
    }
    this.userGroupObj.channels = tempChannelArray
    if(confirm("Make " + user_id + " a Group Assistant Admin?")){
      this.userChannelService.changeRole(this.userGroupObj).subscribe((data)=>{
        if(data.feedback == null){
          this.userChannelService.setLocalUserChannels(data.userChannels)
          this.groupService.setLocalGroupAssists(data.groupAssists)
          window.location.reload();
        }
      })
    }
  }
  //create a new channel within the group
  createChannel(){
    if(this.currentGroupAssist || this.user.role == 'Super Admin' || this.user.role == 'Group Admin'){
      var channel_name = prompt("Enter a channel name");
      if(channel_name != null){
        this.channelobj.name = channel_name;
        this.channelobj.group_id = this.currentGroup.id
        this.channelService.createChannel(this.channelobj).subscribe((data)=>{
          this.channelService.setLocalChannels(data.channels)
          this.userChannels.push({"channel_id": data.id, "user_id": this.user.username})
          this.userChannelService.setLocalUserChannels(this.userChannels);
          for(let c of data.channels){
            if(c.name == channel_name){
              this.socketService.addChannel(c.id)
            }
          }
          window.location.reload();
        })
      } else {
        alert("Enter a channel name")
      }
    } else {
      alert("Incorrect permission")
    }
  }
  // check if the current user is a group assistant
  checkCurrentGroupAssist(){
    for(let groupAssist of this.groupAssists){
      if(groupAssist.group_id == this.groupobj.id && groupAssist.user_id == this.user.username){
        this.currentGroupAssist = true
      }
    }
  }
    
}
