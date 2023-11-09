import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { ItemService } from '../item/item.service';
import { Item } from '../item/item.model';
import { PlaceholderItems } from '../item/placeholder-model';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-food-radar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatGridListModule, MatButtonModule, 
    MatRippleModule, MatCardModule, MatIconModule, DragDropModule],
  templateUrl: './food-radar.component.html',
  styleUrl: './food-radar.component.css'
})
export class FoodRadarComponent {
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
 
   constructor(breakpointObserver: BreakpointObserver, private itemService: ItemService) {
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
 
   ngOnDestroy() {
     this.destroyed.next();
     this.destroyed.complete();
   }

  
  tiles: any[] = [];
  tilesTypes = ['Request', 'Offer', 'Offer', 'Request'];

  placeHolderItems: Item[] = PlaceholderItems.getItems();

  private grid = {
    wide: { cols: 1, rows: 2 },
    narrow: { cols: 2 , rows: 2 },
    tooNarrow: { cols: 4, rows: 2 }
  }
  private buildGridList(typeList: string[], size: string): any[] {
    return typeList.map(type => {
      return { type, ...this.getGridConfigSize(size) };
    });
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

  private WIDE = this.buildGridList(this.tilesTypes, 'wide');

  private NARROW = this.buildGridList(this.tilesTypes, 'narrow');

  private TOO_NARROW = this.buildGridList(this.tilesTypes, 'tooNarrow');

  drop(event: CdkDragDrop<any[]>): void {
    // Handle the drop event with the array of cards
    // You can access the dropped cards using cardsArray
    const draggedData = event.item.data;
    // Identify the element using the data
    
  }

  pickItem(itemIndexInTheGridList: number) {

    this.itemService.setItem(this.placeHolderItems[itemIndexInTheGridList])
  }

}
