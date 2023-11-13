import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubblesComponent } from 'app/components/svg-components/bubbles/bubbles.component';
import { Router, RouterModule } from '@angular/router';
import { HikingComponent } from 'app/components/svg-components/hiking/hiking.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, BubblesComponent, HikingComponent ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private router: Router,
    private _ngZone: NgZone) { }


  public logout(){
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }


}
