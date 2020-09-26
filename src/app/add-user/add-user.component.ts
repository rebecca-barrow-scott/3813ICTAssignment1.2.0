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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id:any;
  user:any;
  groups:any;
  channels:any;
  userChannels:any;
  groupChannelDict:{};
  groupobj = new GroupObj();
  groupChannels = [];
  feedback:string;
  username:string;
  channel:number;
  userobj = new UserObj();
  channelobj = new ChannelUser()
  groupAssists:any;

  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    } else {
      this.groupobj.id = this.route.snapshot.params.id;
      this.channels = JSON.parse(this.channelService.getLocalChannels());
      this.groupAssists = JSON.parse(this.groupService.getLocalGroupAssists());
      this.sortChannels()
    }
  }

  sortChannels(){
    for (let channel of this.channels){
      if (channel.group_id == this.groupobj.id){
        this.groupChannels.push(channel);
      }
    }
  }
  searchUser(){
    this.userobj.username = this.username
    this.userobj.email = this.username + 'test@gmail.com'
    this.userobj.role = 'User'
    this.userobj.password = '123'
    this.userobj.confirm_password = '123'
    if(this.channel == undefined){
      alert("Select a channel")
    } else {
      this.userService.validateUser(this.userobj).subscribe((data)=>{
        if (data.feedback == "Username is taken"){
          if (data.user.role == "User" && this.groupAssists.includes(data.user.username)){
            if(confirm("Add " + this.username + " to " + this.channel + "?")){
              this.addUserChannel()
            }
          } else {
            alert("This user cannot be added")
          }
        }
        if (data.feedback == null){
          if(confirm("User doesn't exists\nWould you like to create a new user?")){
            this.userobj.email = prompt("Enter a email", this.userobj.email);
            this.userobj.password = prompt("Enter a password")
            this.userobj.confirm_password = this.userobj.password
            this.userService.validateUser(this.userobj).subscribe((data)=>{
              if(data.feedback == null){
                this.addUserChannel()
              } else {
                this.feedback = data.feedback + ", try agian."
              }
            })
            
          }
        }
      })
    }
  }
  addUserChannel(){
    for(let c of this.channels){
      if(c.name == this.channel){
        this.channelobj.channel_id = c.id
        this.channelobj.user_id = this.username
        this.userChannelService.addUserChannel(this.channelobj).subscribe((data)=>{
          this.userChannelService.setLocalUserChannels(data.userChannels)
          this.userService.createUser(this.userobj).subscribe((data)=>{
            if(data.feedback == null){}
            this.router.navigateByUrl('/group/'+this.groupobj.id)
          })
        })
      }
    }
  }
}