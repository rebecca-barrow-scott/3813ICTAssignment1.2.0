import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  current_user:any
  all_users: any;
  super_users: any;
  group_admin: any;
  users: any;
  userobj = new UserObj();
  feedback:string = " ";
  
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }

  ngOnInit(): void {
    this.current_user = JSON.parse(this.userService.getUser());
    if(this.current_user == undefined){
      this.router.navigateByUrl('user');
    }
    if(this.current_user.role == 'Super Admin' || this.current_user.role == 'Group Admin'){
      this.userService.getAllUsers().subscribe((data)=>{
        if (data.feedback == null ){
          this.all_users = data.users
          this.super_users = this.filter_users('Super Admin')
          this.group_admin = this.filter_users('Group Admin');
          this.users = this.filter_users('User');
        } else {
          alert("Database Error");
          this.router.navigateByUrl('login');
        }
      })
    } else {
      this.router.navigateByUrl('user');
    }
  }
  filter_users(filter){
    var user_array = []
    for (let user of this.all_users){
      if (user.role == filter && user.username != this.current_user.username){
        user_array.push(user)
      }
    }
    return user_array
  }
  deleteAll(){
    let valid = confirm('Are you sure you want to delete all users?');
    if (valid){
      this.httpClient.post(BACKEND_URL + '/deleteUsers', this.userobj, httpOptions)
      .subscribe((data: any) => {
        window.location.reload();
      });
    }
  }

}
