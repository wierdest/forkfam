import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideFromTopAnimation } from './animations';
import { DatabaseService } from './services/database.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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

  // Inject BreakpointObserver to make the UI adaptive
  destroyed = new Subject<void>();
  // store the currentScreensize
  handsetDevice: string = "Unknown";
  // Create a map to store breakpoint names for logging purposes. The displayName is the currentScreenSize
  displayNameMap = new Map([
  [Breakpoints.HandsetPortrait, 'HandsetPortrait'],
  [Breakpoints.HandsetLandscape, 'HandsetLandscape'],
  ]);

  constructor(
    breakpointObserver: BreakpointObserver,
    private contexts: ChildrenOutletContexts, 
    private databaseService: DatabaseService,) {
      breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.handsetDevice = this.displayNameMap.get(query) ?? 'Unknown';
          
          }
        }
      });


    }

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
