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
import { Subject, takeUntil } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from 'app/services/auth.service';
import { JwtPayload } from 'app/models/jwt-payload.model';
import { DatabaseService } from 'app/services/database.service';
import { Item } from 'app/models/item.model';


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


   constructor(breakpointObserver: BreakpointObserver, 
    private authService: AuthService, 
    private router: Router,
    private databaseService: DatabaseService
    
    ) {
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
      const sub = this.user.sub; // the sub is the  The subject: the ID that represents the principal making the request. 
      console.log('got a user! Checking database for it');
      this.databaseService.getUser(this.user.sub).then((myUser) => {
        if(myUser) {
          console.log(myUser?.googleUserInfo.given_name + 'is already our user');
        } else {
          console.log(this.user!.sub + 'is not our user yet. Adding them to the database right now');
          const offers: Item[] = [];
          const orders: Item[] = []
          this.databaseService.addNewUser(this.user!.sub, this.user!, offers, orders);
        }
      })

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
