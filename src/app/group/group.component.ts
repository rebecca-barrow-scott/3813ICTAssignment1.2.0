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
  groupChannelDict:{};
  currentGroup = new GroupObj();
  groupobj = new GroupObj();
  users:any;
  groupAssists:any;
  channelobj = new ChannelObj();
  channelUser = new ChannelUser();
  userGroupObj = new UserGroupObj();


  // userGroupObj = new UserGroupObj()
  // feedback:string;
  // username:string;
  // channel_array:any;
  // channel:any
  // userobj = new UserObj();
  // all_users:any;
  // all_channel_users:any;
  // channel_users:any;
  // channel_user = new ChannelUser();
  // group_array:any
  
  // channels:any
  // group_array2:any
  // channel_array2:any
  // channels2:any
  // 
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService) { }

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
      this.groupAssists = JSON.parse(this.groupService.getLocalGroupAssists());
      this.groupChannelDict = this.sortGroupChannels();
      this.userService.getAllUsers().subscribe((data)=>{
        this.users = data.users
      })
    }
  }

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
  removeChannel(id, name){
    if(confirm("Are you sure you would like to delete " + name + "?")){
      this.channelobj.id = id
      this.userChannelService.removeChannel(this.channelobj).subscribe((data)=>{
        if (data.feedback == null){
          this.userChannelService.setLocalUserChannels(data.userChannels)
          this.channelService.deleteChannel(this.channelobj).subscribe((data)=>{
            if(data.feedback == null){
              this.channelService.setLocalChannels(data.channels);
              window.location.reload();
            }
          })
        }
      })
    }
  }
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
  removeUserChannel(channel_id, user_id){
    this.channelUser.channel_id = channel_id
    this.channelUser.user_id = user_id
    if(confirm("Remove user from the channel")){
      this.userChannelService.removeUserChannel(this.channelUser).subscribe((data)=>{
        if(data.feedback == null){
          this.userChannelService.setLocalUserChannels(data.userChannels)
          window.location.reload();
        } else {
          alert("Error")
        }
        
      })
    }
  }
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

  createChannel(){
    var channel_name = prompt("Enter a channel name");
    if(channel_name != ""){
      this.channelobj.name = channel_name;
      this.channelobj.group_id = this.currentGroup.id
      this.channelService.createChannel(this.channelobj).subscribe((data)=>{
        this.channelService.setLocalChannels(data.channels)
        window.location.reload();
      })
    } else {
      alert("Enter a channel name")
    }
   
  }
    
}
