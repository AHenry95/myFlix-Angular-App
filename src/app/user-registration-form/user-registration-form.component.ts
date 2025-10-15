import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationForm component is accessed via the welcome page.
 * This component is used to create a new user object in the database, 
 * using the information entered by the user in the form. 
 */

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Name: '', Username: '', Password: '', Email: '', Birthdate: '' };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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