import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BubblesComponent } from '../bubbles/bubbles.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-complete-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, BubblesComponent, SuccessComponent],
  templateUrl: './complete-registration.component.html',
  styleUrl: './complete-registration.component.css'
})
export class CompleteRegistrationComponent {

}
