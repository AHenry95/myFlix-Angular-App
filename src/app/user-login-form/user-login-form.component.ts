import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The UserLoginForm component provides a disalog where users can enter their username and password to access the application.
 * When user's enter accurate login information the user object returned from the API request will be saved to localStorage.
 * The token included in the API response is saved to local Storage seperately.
 * 
 * The user is routed to the movies view, which displayed the MovieCard component, once authenticated.  
 */
@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() userLoginData = { Username: '', Password: '' };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  userLogin(): void {
    this.fetchApiData.userLogin(this.userLoginData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.dialogRef.close();
      this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}