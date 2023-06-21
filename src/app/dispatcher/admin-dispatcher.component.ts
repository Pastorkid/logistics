import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

@Component({
  templateUrl: './admin-dispatcher.component.html',
  styleUrls: ['./admin-dispatcher.component.css'],
})
export class AdminDispatcherComponent implements OnInit{
  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {
   
  }

  onlogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
