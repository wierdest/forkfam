import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdgsDoughnutComponent } from '../sdgs-doughnut/sdgs-doughnut.component';
import { SdgsIconsComponent } from '../sdgs-icons/sdgs-icons.component';
import { ToptapComponent } from '../toptap/toptap.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SdgService } from 'app/services/sdg.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatRippleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatCardModule,
    MatInputModule, DragDropModule, MatFormFieldModule, FormsModule, SdgsDoughnutComponent, SdgsIconsComponent, ToptapComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  selectedGoal: number = 0; // this is the current icon index + 1
  
  private subscription: Subscription | undefined;

  constructor(public sdgService: SdgService) {}

  public isFlipped = false;

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  refreshSdgs() {
    this.sdgService.updateSelectedGoal(this.selectedGoal - 1);
  }

  ngOnInit() {
    this.subscription = this.sdgService.selectedGoal$.subscribe((selectedGoal) => {
      this.selectedGoal = selectedGoal + 1;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

