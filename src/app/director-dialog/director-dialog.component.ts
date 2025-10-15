import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The DirectorDialog component is displayed as part of the MovieCard component.
 * The DirectorDialog recieves movie data from the parent MovieCard component;
 * it displays the name, bio, and birthyear of the movie's director when clicked.   
 */
@Component({
  selector: 'app-director-dialog',
  standalone: false,
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})
export class DirectorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      bio: string;
      birthyear: string;
    }
  ) {}
}
