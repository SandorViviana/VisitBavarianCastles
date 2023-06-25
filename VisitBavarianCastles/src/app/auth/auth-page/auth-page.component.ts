import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  onLogInClick(): void {
    this.showLoginForm = true;
  }

  onRegisterClick(): void {
    this.showRegisterForm = true;
  }

}
