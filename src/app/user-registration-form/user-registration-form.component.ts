import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Dialog component for new user registration. 
 * 
 * The UserRegistrationForm component is accessed via the welcome page.
 * This component is used to create a new user object in the database, 
 * using the information entered by the user in the form. 
 * 
 * @component
 * @selector app-user-registration-form
 */

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent {
  /**
   * New user registration fata bound ot the form inputs via ngModel.
   * Contains all required fields for user registration.
   */
  @Input() userData = { Name: '', Username: '', Password: '', Email: '', Birthdate: '' };

  /**
   * Creates an instance of the UserRegistrationForm Component.
   * 
   * @param fetchApiData - Service for making API calls
   * @param dialogRef - Reference to the dialog for closing after successful registration
   * @param snackBar - material SnackBar service for displaying notifications
   */
  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Registers a new user with provided information.
   * On success, closes the dialog and displays a success message.
   * User must log in seperately with their newly created credentials. 
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}