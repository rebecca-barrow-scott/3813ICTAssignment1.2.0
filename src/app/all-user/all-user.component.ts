import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  all_users = [
    {name: "User 1", email: "user1@gmail.com", role:"Group Admin"},
    {name: "User 2", email: "user1@gmail.com", role:"Group Admin"},
    {name: "User 3", email: "user1@gmail.com", role:"Group Assist Admin"},
    {name: "User 4", email: "user1@gmail.com", role:"User"},
    {name: "User 5", email: "user1@gmail.com", role:"User"},
  ];
  group_admin = this.filter_users('Group Admin');
  assist_admin = this.filter_users('Group Assist Admin');
  users = this.filter_users('User');
  constructor() { }

  ngOnInit(): void {
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
