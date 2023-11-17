import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideFromTopAnimation } from './animations';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    slideFromTopAnimation
  ]
})
export class AppComponent {
  title = 'forkfam';

  constructor(private contexts: ChildrenOutletContexts, private databaseService: DatabaseService) {}

  ngOnInit() {
    // open database
    this.databaseService.openDatabase('userDatabase', 1)
      .then(() => {
        console.log('Database opened successfully');
      })
      .catch(() => {
        console.error('Error opening database');
      });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
