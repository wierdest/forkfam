import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SdgService } from 'app/services/sdg.service';

@Component({
  selector: 'app-sdgs-icons',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatRippleModule],
  templateUrl: './sdgs-icons.component.html',
  styleUrl: './sdgs-icons.component.css',
  animations: [
    trigger('floatUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1.0s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class SdgsIconsComponent {

  @Output() drawerOpen = new EventEmitter<void>();
  @Output() selectedGoal = new EventEmitter<number>();

  openDrawer(index: number) {
    
    this.sdgService.updateSelectedGoal(index);
    this.drawerOpen.emit();
  }

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
 
  constructor(breakpointObserver: BreakpointObserver, private sdgService: SdgService) {
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
          if(this.currentScreenSize === 'XSmall') {
            this.tiles = this.TOO_NARROW;
          } else if (this.currentScreenSize === 'Small') {
            this.tiles = this.NARROW;
          } else {
            this.tiles = this.WIDE;
          }
        }
      }
    });

  }
  private grid = {
    wide: { cols: 1, rows: 3 },
    narrow: { cols: 2 , rows: 4 },
    tooNarrow: { cols: 4, rows: 3 }
  }
 
  private getGridConfigSize(size: string) : any {
    if(size === 'wide') {
      return this.grid.wide;
    } else if (size === 'narrow') {
      return this.grid.narrow;
    } else {
      return this.grid.tooNarrow;
    }
  }

  tiles: any[] = [];

  private buildGridList(dataList: string[], size: string): any[] {
    return dataList.map(data => {
      return { data, ...this.getGridConfigSize(size), hoverState: false, };
    });
  }

  private WIDE = this.buildGridList(this.sdgService.sdgIconPaths, 'wide');

  private NARROW = this.buildGridList(this.sdgService.sdgIconPaths, 'narrow');

  private TOO_NARROW = this.buildGridList(this.sdgService.sdgIconPaths, 'tooNarrow');

}
