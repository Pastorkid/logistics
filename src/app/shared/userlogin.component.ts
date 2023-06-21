import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent implements OnInit {
greeting:any

today = new Date()
curHr = this.today.getHours()
 userDetails!: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (this.curHr < 12) {
      this.greeting='Good morning'
    } else if (this.curHr < 18) {
    this.greeting='good afternoon'
    } else {
      this.greeting='Good evening'
    }
    let token = this.authService.decodeToken();
    if (token) {
      this.userDetails = token;
    }
  }
}
