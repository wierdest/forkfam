import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarComponent } from '../avatar/avatar.component';
import { FoodRadarComponent } from '../food-radar/food-radar.component';
import { FiltersComponent } from '../svg-components/filters/filters.component';
import { EatingTogetherComponent } from '../svg-components/eating-together/eating-together.component';
import { ChefComponent } from '../svg-components/chef/chef.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { AuthService, JwtPayload } from 'app/services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatMenuModule, MatTabsModule, MatRippleModule, MatDividerModule,  AvatarComponent, FoodRadarComponent, FiltersComponent, 
  EatingTogetherComponent, ChefComponent  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   // Inject BreakpointObserver to make the UI adaptive
   destroyed = new Subject<void>();
   // store the currentScreensize
   currentScreenSize: string = "";
     // Create a map to store breakpoint names for logging purposes. The displayName is the currentScreenSize
     displayNameMap = new Map([
     [Breakpoints.XSmall, 'XSmall'],
     [Breakpoints.Small, 'Small'],
     [Breakpoints.Medium, 'Medium'],
     [Breakpoints.Large, 'Large'],
     [Breakpoints.XLarge, 'XLarge'],
   ]);

    user: JwtPayload | null = null;


   constructor(breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {
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
             this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
           }
         }
     })
   }

   ngOnInit() {

    this.user = this.authService.getDecodedTokenInfo();
    if(this.user) {
      console.log('got a user!')
    }
    
   }
   ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
 
   refreshClicked() {
     // Add the logic you want to execute when the div is clicked
     // For example, triggering a refresh action or navigating to another page
     console.log('Refresh button clicked!');
   }

   signOut() {
    this.authService.signOutExternal();
    this.router.navigate(['/farewell'])
  }

}
