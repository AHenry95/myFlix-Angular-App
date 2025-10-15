import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/** 
 * The WelcomePageComponent serves as the landing page for the myFlix application. 
 * 
 * This component displays a welcome message for users,
 * and provides buttons gor them to either register for a new account or log into an exisiting account.
 * Both buttons open their respeicitive dialog forms. 
*/

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit { 
  constructor (
    public dialog: MatDialog,
    public router: Router
  ) {}

  /** 
   * When the component is mounted, user who have already logged in 
   * and have a valid token in in localStorage will be redirected to the MoiveCard view.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['movies']);
    }
  }
  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}