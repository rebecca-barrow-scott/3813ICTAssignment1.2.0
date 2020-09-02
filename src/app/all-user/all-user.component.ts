import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  all_users: any;
  group_admin: any;
  assist_admin: any;
  users: any;
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // this.all_users = JSON.parse(this.userService.getUsers());
    // this.group_admin = this.filter_users('Group Admin');
    // this.assist_admin = this.filter_users('Group Assist Admin');
    // this.users = this.filter_users('User');
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
