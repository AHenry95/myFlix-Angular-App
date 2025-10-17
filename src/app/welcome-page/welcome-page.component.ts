import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/** 
 * Landing page component for unauthenticated users. 
 * 
 * This component displays a welcome message for users,
 * and provides buttons gor them to either register for a new account or log into an exisiting account.
 * Both buttons open their respeicitive dialog forms. 
 * 
 * @component
 * @selector app-welcome-page
*/

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of the WelcomePage Component
   * 
   * @param dialog - Material Dialog service for opening login/registration dialogs
   * @param router - Angular Router service for navigation 
  */ 
  constructor (
    public dialog: MatDialog,
    public router: Router
  ) {}

  /** 
   * Angular hook that runs on component initialization.
   * When the component is mounted, users who have already logged in
   * and have a valid token saved in localStorage will be redirected to the movies view.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['movies']);
    }
  }
  
  /**
   * Opens the user registration dialog.
   * Displays a form for new users to create an account.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * Displays a form for exisiing users to log in.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}