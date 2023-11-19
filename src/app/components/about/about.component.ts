import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdgsDoughnutComponent } from '../sdgs-doughnut/sdgs-doughnut.component';
import { SdgsIconsComponent } from '../sdgs-icons/sdgs-icons.component';
import { ToptapComponent } from '../toptap/toptap.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatRippleModule,
    SdgsDoughnutComponent, SdgsIconsComponent, ToptapComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}

