import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  all_users: any;
  super_users: any;
  group_admin: any;
  assist_admin: any;
  users: any;
  userobj = new UserObj();
  feedback:string = " ";
  
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URL + '/getUsers', this.userobj, httpOptions)
    .subscribe((data: any) => {
        this.all_users = data
        this.super_users = this.filter_users('Super Admin')
        this.group_admin = this.filter_users('Group Admin');
        this.assist_admin = this.filter_users('Group Assit Admin');
        this.users = this.filter_users('User');
    });
  }
  filter_users(filter){
    var user_array = []
    for (let user of this.all_users){
      if (user.role == filter){
        user_array.push(user)
      }
    }
    return user_array
  }

}
