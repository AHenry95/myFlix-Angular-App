import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit-form',
  standalone: false,
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Email: '',
    Password: '',
    Birthdate: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.userData = {
      Name: this.data.user.Name,
      Username: this.data.user.Username,
      Email: this.data.user.Email,
      Password: '',
      Birthdate: this.data.user.Birthdate
    };
  }

  editUser(): void {
    const userID = this.data.user._id;

    const updatedData: any = {};

    if (this.userData.Name) updatedData.Name = this.userData.Name;
    if (this.userData.Username) updatedData.Username = this.userData.Username;
    if (this.userData.Email) updatedData.Email = this.userData.Email;
    if (this.userData.Password) updatedData.Password = this.userData.Password;
    if (this.userData.Birthdate) updatedData.Birthdate = this.userData.Birthdate;

    this.fetchApiData.editUser(userID, updatedData).subscribe({
      next: (result) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000
        });

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...storedUser, ...result };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snackBar.open('Failed to update profile', 'OK', {
          duration: 2000
        });
      }
    });
  }
}