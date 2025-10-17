import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/** 
 * Navigation bar component for authenticated users.
 * 
 * The Navbar component displays a navbar at the top of views accessible by authenticated user's (the movies view and the user profile view).
 * The Navbar contains 4 clickable options: 
 * 1. The myFlix site title - clicking brings authenticated users to the movies view
 * 2. Movies icon - clicking brings the user to the movies view
 * 3. Profile icon - brings authenticated users to the profile view
 * 4. Logout icon - logs out user, clears localStorage, and brings user to the welcome screen
 * 
 * @component  
 * @selector app-navbar
*/
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /**
   * Creates an instance of the NavbarComponent.
   * 
   * @param router - Angular Router service for navigation
   * @param snackBar - Material Snackbar service for displaying notifications
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Checks if a user is currently logged in.
   * 
   * @returns True if a valid token exists in localStorage; false otherwise
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /** 
   * Logs out the current user.
   * Clears akll user data from localStorage, navigates to the welcome page, 
   * and displays a message for the user confirming they have been logged out.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000
    });
  }
}