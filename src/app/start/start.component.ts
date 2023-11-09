import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubblesComponent } from '../bubbles/bubbles.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, BubblesComponent, RouterModule, MatButtonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

}
