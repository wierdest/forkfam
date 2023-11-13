import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BubblesComponent } from 'app/components/svg-components/bubbles/bubbles.component';
import { MatButtonModule } from '@angular/material/button';
import { VoidComponent } from 'app/components/svg-components/void/void.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, BubblesComponent, MatButtonModule, VoidComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
