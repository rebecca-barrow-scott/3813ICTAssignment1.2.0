import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username:string
  role:string
  user:any
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    this.username = this.user.username
    this.role = this.user.role
  }
}
