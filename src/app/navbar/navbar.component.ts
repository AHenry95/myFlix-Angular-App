import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/** 
 * The Navbar component displays a navbar at the top of views accessible by authenticated user's (the movies view and the user profile view).
 * The Navbar contains 4 clickable options: 
 * 1. The myFlix site title - clicking brings authenticated users to the movies view
 * 2. Movies icon - clicking brings the user to the movies view
 * 3. Profile icon - brings authenticated users to the profile view
 * 4. Logout icon - logs out user, clears localStorage, and brings user to the welcome screen  
 *  
*/
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000
    });
  }
}