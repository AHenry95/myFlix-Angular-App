import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for displaying director information.
 * 
 * The DirectorDialog component is displayed as part of the MovieCard component.
 * The DirectorDialog recieves movie data from the parent MovieCard component, and it
 * it displays the name, bio, and birthyear of the movie's director when clicked.
 * 
 * @component
 * @selector app-director-dialog   
 */
@Component({
  selector: 'app-director-dialog',
  standalone: false,
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})
export class DirectorDialogComponent {
  /**
   * Creates an instance of the DirectorDialogComponent.
   * 
   * @param data - the director information to display
   * @param data.name - The director's full name
   * @param data.bio - A brief biography of the director
   * @param data.birthyear - The year the director was born
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      bio: string;
      birthyear: string;
    }
  ) {}
}
