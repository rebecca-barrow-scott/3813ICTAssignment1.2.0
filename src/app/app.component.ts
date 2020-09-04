import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chattyapp';
  user = JSON.parse(localStorage.getItem("user"));

  logout(){
    localStorage.removeItem("user");
  }
}
