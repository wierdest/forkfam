import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubblesComponent } from '../svg-components/bubbles/bubbles.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { GoogleSignInComponent } from 'app/components/google-sign-in/google-sign-in.component';
import { AuthService } from 'app/services/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, BubblesComponent, RouterModule, MatButtonModule, GoogleSignInComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

   // Inject BreakpointObserver to make the UI adaptive
   destroyed = new Subject<void>();
   // store the currentScreensize
   smallDevice: boolean = false;
   // Create a map to store breakpoint names for logging purposes. The displayName is the currentScreenSize
   displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
   ]);
 

  constructor(
    breakpointObserver: BreakpointObserver,
    public authService: AuthService, 
    private router: Router) {

      breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
    
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const size = this.displayNameMap.get(query) ?? 'Unknown';
            if(size === 'XSmall') {
              this.smallDevice = true;
            
            } else if (size === 'Small') {
              this.smallDevice = true;
           
            } else {
              this.smallDevice = false
            }
          }
        }
      });

    }

    ngOnDestroy() {
      this.destroyed.next();
      this.destroyed.complete();
    }
   

  signOut() {
    this.authService.signOutExternal();
    this.router.navigate(['/farewell'])
  }

}
