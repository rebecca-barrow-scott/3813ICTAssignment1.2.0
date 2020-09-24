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
import { ChannelObj } from 'E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\src\\app\\class\\channelobj';
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
  users:any


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
  // channelobj = new ChannelObj();
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
      this.groupChannelDict = this.sortGroupChannels();
      this.userService.getAllUsers().subscribe((data)=>{
        this.users = data.users
      })
      
      // this.getGroups()
      // this.getGroupChannels()
      // this.getUsers()
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

  // getGroups(){
  //   this.httpClient.post(BACKEND_URL + '/getGroups', this.userobj, httpOptions)
  //   .subscribe((data: any) => {
  //     if(data.feedback == null){
  //       this.group_array = JSON.parse(data.groups);
  //       for(let group of this.group_array){
  //         if(this.id.id == group.id){
  //           this.id.name = group.name
  //         }
  //       }
  //     } else {
  //       this.feedback = data.feedback;
  //     }
  //   });
  // }
  // getGroupChannels(){
  //   this.httpClient.post(BACKEND_URL + '/getChannel', this.id, httpOptions)
  //   .subscribe((data: any) => {
  //     if (data.feedback == null){
  //       this.channel_array = data.channels;
  //       this.channel_array.unshift({"id": "0", "name": "All"});
  //     } else {
  //       this.feedback = data.feedback;
  //     }
  //   });
  // }
  // getUsers(){
  //   this.httpClient.post(BACKEND_URL + '/getUsers', this.userobj, httpOptions)
  //     .subscribe((data: any) => {
  //         this.all_users = data
  //         this.getChannelUsers()
  //     });
  // }
  // getChannelUsers(){
  //   this.httpClient.post(BACKEND_URL + '/getChannelUsers', this.userobj, httpOptions)
  //     .subscribe((data: any) => {
  //         this.all_channel_users = JSON.parse(data.channelUsers)
  //         this.channel_users = this.sortUsers()
  //     });
  // }
  // sortUsers(){
  //   var channel_users = {}
  //   for(let user of this.all_users){
  //     for(let item of this.all_channel_users){
  //       if(user.username == item.user_id){
  //         if(item.channel_id in channel_users){
  //           channel_users[item.channel_id].push(item)
  //         } else {
  //          channel_users[item.channel_id] = [item]
  //         }
  //       }
  //       if(this.user.username == item.user_id){
  //         this.user.role = item.role
  //       }
  //     }
  //   }
  //   return channel_users
  // }
  // searchUser(){
  //   this.userGroupObj.username = this.username
  //   this.userGroupObj.group_id = this.id
  //   if(this.channel == "All"){
  //     this.channel_array.splice(0, 1)
  //     this.userGroupObj.channels = this.channel_array
  //   } else {
  //     for (let item of this.channel_array){
  //       if (item.name == this.channel){
  //         this.userGroupObj.channels = [{"id": item.id, "name": item.name}]
  //       }
  //     }
  //   }
  //   this.httpClient.post(BACKEND_URL + '/searchUser', this.userGroupObj, httpOptions)
  //   .subscribe((data: any) => {
  //     if (data.feedback == "User exists"){
  //       this.addToChannel()
  //       // window.location.reload();
  //     } else if(data.feedback == "User doesn't exist"){
  //         if(confirm("User doesn't exist \nWould you like to create a new one?")){
  //           var email = prompt("Please enter an email", this.username + "@gmail.com");
  //           this.createUser(email);
  //         } else {
  //           this.feedback = data.feedback
  //         }
  //     } else {
  //       this.feedback = data.feedback
  //     }
  //   });
  // }
  // createUser(email){
  //   this.userobj.username = this.username
  //   this.userobj.email = email
  //   this.userobj.role = 'User'
  //   this.userobj.password = '123'
  //   this.userobj.confirm_password = '123'
  //   this.httpClient.post(BACKEND_URL + '/createUser', this.userobj, httpOptions)
  //   .subscribe((data: any) => {
  //     if (data.feedback == null){
  //       this.addToChannel();
  //     } else {
  //       this.feedback = data.feedback
  //     }
  //   });
  // }
  // addToChannel(){
  //   this.userGroupObj.username = this.username
  //   this.userGroupObj.group_id = this.id
  //   if(this.channel == "All"){
  //     this.channel_array.splice(0, 1)
  //     this.userGroupObj.channels = this.channel_array
  //   } else {
  //     for (let item of this.channel_array){
  //       if (item.name == this.channel){
  //         this.userGroupObj.channels = [{"id": item.id, "name": item.name}]
  //       }
  //     }
  //   }
  //   this.httpClient.post(BACKEND_URL + '/addUserChannel', this.userGroupObj, httpOptions)
  //   .subscribe((data: any) => {
  //     if (data.feedback == null){
  //         window.location.reload();
  //     } else{
  //       this.feedback = data.feedback
  //     }
  //   });
  // }
  // removeUser(channel_id, user_id){
  //   let valid = confirm('Are you sure you want to remove '+user_id+' from the channel?');
  //   if(valid){
  //     this.channel_user.channel_id = channel_id
  //     this.channel_user.user_id= user_id
  //     this.httpClient.post(BACKEND_URL + '/removeChannelUser', this.channel_user, httpOptions)
  //     .subscribe((data: any) => {
  //       if (data.feedback == null){
  //           window.location.reload();
  //       } else{
  //         this.feedback = data.feedback
  //       }
  //     });
  //   }

  // }
  // removeChannel(channel_id){
  //   let valid = confirm('Are you sure you want to remove this channel?');
  //   if(valid){
  //     this.channel_user.channel_id = channel_id
  //     this.httpClient.post(BACKEND_URL + '/removeChannel', this.channel_user, httpOptions)
  //     .subscribe((data: any) => {
  //       if (data.feedback == null){
  //           window.location.reload();
  //       } else{
  //         this.feedback = data.feedback
  //       }
  //     });
  //   }
  // }
  // removeGroup(){
  //   let valid = confirm('Are you sure you want to remove this group?');
  //   if(valid){
  //     this.userGroupObj.group_id = this.id.id
  //     this.httpClient.post(BACKEND_URL + '/removeGroup', this.userGroupObj, httpOptions)
  //     .subscribe((data: any) => {
  //       if (data.feedback == null){
  //         this.router.navigateByUrl('user');
  //       } else{
  //         this.feedback = data.feedback
  //       }
  //     });
  //   }
  // }
  // changeRoleGroup(user_id){
  //   this.userGroupObj.group_id = this.id.id
  //   this.userGroupObj.username = user_id
  //   this.userGroupObj.channels = this.channel_array
  //   this.httpClient.post(BACKEND_URL + '/changeRoleGroup', this.userGroupObj, httpOptions)
  //   .subscribe((data: any) => {
  //     if (data.feedback == null){
  //       this.addToChannel()
  //     } else {
  //       this.feedback = data.feedback
  //     }
  //   });
  // }
  // createChannel(id){
  //   if(this.user.role == "Super Admin" || this.user.role == "Group Admin" || this.user.role == "Group Assist Admin"){
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
  // }
    
}
