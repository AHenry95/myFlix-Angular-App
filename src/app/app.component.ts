import { Component } from '@angular/core';

/**
 * Root component of the MyFlix Angular Application
 * 
 * This is the main application component that serves as the container for all the other components.
 * It includes the navigation bar and the router outlet for rendering routed components.
 * 
 * @component
 * @selector app-root 
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**  The title of the application displayed in the browser tab */
  title = 'myFlix-Angular-Client';
}