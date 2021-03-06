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
import { MessagesService } from '../messages.service';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = ""
  password:string = ""
  verify:boolean = false
  feedback:string = " "
  userobj = new UserObj()
  user:any


  constructor(private router:Router, 
              private userService:UserService, 
              private groupService:GroupService, 
              private channelService:ChannelService, 
              private userChannelService:UserChannelService,
              private messageService:MessagesService) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user != undefined){
      this.router.navigateByUrl('user');
    }
  }
  // validate the users passeord and email. If the validation check passes then the local storage
  // is set
  public loginFunc(){
    this.userobj.email = this.email
    this.userobj.password = this.password

    this.userService.authUser(this.userobj).subscribe((data)=>{
      if (data.feedback == null){
        this.userService.setUser({"username": data.user.username, "email": data.user.email, "role": data.user.role, "img": data.user.img});
        this.groupService.getGroups().subscribe((data)=>{
          if (data.feedback == null){
            this.groupService.setLocalGroups(data.groups);
          }
        });
        this.groupService.getGroupAssists().subscribe((data)=>{
          if (data.feedback == null){
            this.groupService.setLocalGroupAssists(data.groupAssists);
          }
        });
        this.userChannelService.getUserChannels(data.user).subscribe((data)=>{
          if (data.feedback == null){
            this.userChannelService.setLocalUserChannels(data.userChannels);
          }
        });
        this.userChannelService.getAllUserChannels().subscribe((data)=>{
          if (data.feedback == null){
            this.userChannelService.setLocalAllUserChannels(data.userChannels);
          }
        });
        this.channelService.getChannels().subscribe((data)=>{
          if (data.feedback == null){
            this.channelService.setLocalChannels(data.channels);
          }
        });
        this.messageService.getMessages().subscribe((data)=>{
          if (data.feedback == null){
            this.messageService.setLocalMessages(data.messages);
          }
        });
        this.router.navigateByUrl('user');
      } else{
        this.feedback = data.feedback
      }
    })
  }
}
