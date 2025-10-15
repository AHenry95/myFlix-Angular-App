import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The SynopsisDialog component is displayed as part of the MovieCard component.
 * The SynopsisDialog recieves movie data from the parent MovieCard component;
 * it displays the movies title and synopsis when clicked.  
 */
@Component({
  selector: 'app-synopsis-dialog',
  standalone: false,
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      synopsis: string;
    }
  ) {}
}