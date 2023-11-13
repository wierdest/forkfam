import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BubblesComponent } from '../svg-components/bubbles/bubbles.component';
import { SuccessComponent } from '../svg-components/success/success.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-complete-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, BubblesComponent, SuccessComponent],
  templateUrl: './complete-registration.component.html',
  styleUrl: './complete-registration.component.css'
})
export class CompleteRegistrationComponent {

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    if(this.authService.hasToken) {
      
    }
  }

}
