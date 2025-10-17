import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for diaplaying movie synopses.
 * 
 * The SynopsisDialog component is displayed as part of the MovieCard component.
 * The SynopsisDialog recieves movie data from the parent MovieCard component, and
 * it displays the movies title and synopsis when clicked.
 * 
 * @component
 * @selector app-synopsis-dialog  
 */
@Component({
  selector: 'app-synopsis-dialog',
  standalone: false,
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent {
  /**
   * Creates an instance of the SynopsisDialogComponent
   * 
   * @param data - The movie information to display
   * @param data.title - The title of the movie
   * @param data.synopsis - The plot summary/description of the movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      synopsis: string;
    }
  ) {}
}