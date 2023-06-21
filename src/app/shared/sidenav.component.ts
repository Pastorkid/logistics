import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sidenavbar',
  templateUrl: './sidenav.component.html',
  styles: [
    `
      .main {
        top: 0;
        left: 0;
        height: 100vh;
        background: white;
        width: 15%;
      }
      .bgindicator {
        border-radius: 30px 0px 0px 30px;
      }

      .black {
        background: #1e1e1e;
        height: 50px;
      }
      .whiteone,
      .whitetwo,
      .whitethree,
      .whitefour,
      .whitefive {
        background: #ffffff;
        height: auto;
        color: black;
        border-color: white;
      }

      .divcont {
        height: 18px;
        background: #1e1e1e;
        border-color: black;
        width: 100%;
        border-bottom-right-radius: 50px;
      }
      .divcontt {
        height: 18px;
        background: #1e1e1e;
        width: 100%;
        border-top-right-radius: 50px;
        border-color: black;
      }
      .divend {
        height: 18px;
        background: #1e1e1e;
        width: 100%;
        border-top-right-radius: 35px;
      }
      .styled {
        background: white;
      }
      .clickcolor {
        background: #ffffff;
      }
    `,
  ],
})
export class AdminSidenavComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  whiteone = false;
  whitetwo = false;
  whitethree = false;
  whitefour = false;
  whitefive = false;
  hide: boolean = true;
  hideone: boolean = true;
  hidetwo: boolean = true;
  hidethree: boolean = true;
  hidefour: boolean = true;
  userDetails!: any;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.hidedivone();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    let token = this.authService.decodeToken();
    if (token) {
      this.userDetails = token;
    }

  }
  hidedivone(): void {
    this.hide = false;
    this.hideone = true;
    this.hidetwo = true;
    this.hidethree = true;
    this.hidefour = true;
    this.whitetwo = false;
    this.whitethree = false;
    this.whitefour = false;
    this.whitefive = false;
    this.whiteone = true;
  }
  hidedivtwo(): void {
    this.hideone = false;
    this.hide = true;
    this.hidetwo = true;
    this.hidethree = true;
    this.hidefour = true;
    this.whiteone = false;
    this.whitethree = false;
    this.whitefour = false;
    this.whitefive = false;
    this.whitetwo = true;
  }
  hidedivthree(): void {
    this.hidetwo = false;
    this.hide = true;
    this.hideone = true;
    this.hidethree = true;
    this.hidefour = true;
    this.whiteone = false;
    this.whitetwo = false;
    this.whitefour = false;
    this.whitefive = false;
    this.whitethree = true;
  }
  hidedivfour(): void {
    this.hidethree = false;
    this.hidetwo = true;
    this.hide = true;
    this.hideone = true;
    this.hidefour = true;
    this.whiteone = false;
    this.whitetwo = false;
    this.whitethree = false;
    this.whitefive = false;
    this.whitefour = true;
  }
  hidedivfive(): void {
    this.hidefour = false;
    this.hide = true;
    this.hideone = true;
    this.hidetwo = true;
    this.hidethree = true;
    this.whiteone = false;
    this.whitetwo = false;
    this.whitethree = false;
    this.whitefour = false;
    this.whitefive = true;
  }
  getClassone() {
    if (this.whiteone) return 'whiteone clicked';
    return 'black';
  }
  getClasstwo() {
    if (this.whitetwo) return 'whitetwo clicked';
    return 'black';
  }
  getClassthree() {
    if (this.whitethree) return 'whitethree clicked';
    return 'black';
  }
  getClassfour() {
    if (this.whitefour) return 'whitefour clicked';
    return 'black';
  }
  getClassfive() {
    if (this.whitefive) return 'whitefive clicked';
    return 'black';
  }
}
