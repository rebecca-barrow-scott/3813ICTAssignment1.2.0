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


  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private groupService:GroupService, private channelService:ChannelService, private userChannelService:UserChannelService) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user != undefined){
      this.router.navigateByUrl('user');
    }
  }

  public loginFunc(){
    this.userobj.email = this.email
    this.userobj.password = this.password

    this.userService.authUser(this.userobj).subscribe((data)=>{
      if (data.feedback == null){
        this.userService.setUser({"username": data.user.username, "email": data.user.email, "role": data.user.role});
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
        this.channelService.getChannels().subscribe((data)=>{
          if (data.feedback == null){
            this.channelService.setLocalChannels(data.channels);
          }
        });
        this.router.navigateByUrl('user');
      } else{
        this.feedback = data.feedback
      }
    })
  }
}
