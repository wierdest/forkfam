import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubblesComponent } from '../svg-components/bubbles/bubbles.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { GoogleSignInComponent } from 'app/components/google-sign-in/google-sign-in.component';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, BubblesComponent, RouterModule, MatButtonModule, GoogleSignInComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

  constructor(public authService: AuthService, private router: Router) {}

  signOut() {
    this.authService.signOutExternal();
    this.router.navigate(['/farewell'])
  }

}
