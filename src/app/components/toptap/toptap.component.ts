import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toptap',
  standalone: true,
  imports: [CommonModule, RouterModule, MatRippleModule, MatIconModule],
  templateUrl: './toptap.component.html',
  styleUrl: './toptap.component.css'
})
export class ToptapComponent {

}
