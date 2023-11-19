import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-sdgs-icons',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './sdgs-icons.component.html',
  styleUrl: './sdgs-icons.component.css'
})
export class SdgsIconsComponent {

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
 
  constructor(breakpointObserver: BreakpointObserver) {
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
 
  icons: string[] = this.createSDGSIconsArray();
  private createSDGSIconsArray() : string[] {
    const iconBasePath = '/assets/images/sdgs/E-WEB-Goal-'
    const array = [];
    for (let i = 1; i <= 17; i++) {
      // Use String literal and padStart to achieve the '01', '02', ..., '17' format
      const filename: string = `${iconBasePath}${i.toString().padStart(2, '0')}.png`;

      array.push(filename);
    }
    return array;
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
      return { data, ...this.getGridConfigSize(size) };
    });
  }

  private WIDE = this.buildGridList(this.icons, 'wide');

  private NARROW = this.buildGridList(this.icons, 'narrow');

  private TOO_NARROW = this.buildGridList(this.icons, 'tooNarrow');

}
