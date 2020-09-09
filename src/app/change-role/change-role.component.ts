import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  user:any
  username:string
  role:string
  feedback:string
  userobj = new UserObj()
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    }
    if(this.user.role == 'Super Admin' || this.user.role == 'Group Admin'){
      this.username = this.route.snapshot.params.id;
      if(this.username == this.user.username){
        this.router.navigateByUrl('allUser');
      }
    } else {
      this.router.navigateByUrl('user');
    }
    
  }
  updateUser(){
    this.userobj.username = this.username
    this.userobj.role = this.role

    this.httpClient.post(BACKEND_URL + '/changeRole', this.userobj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        this.router.navigateByUrl('allUser');
      } else {
        this.feedback = data.feedback
      }
    });
  }

}
