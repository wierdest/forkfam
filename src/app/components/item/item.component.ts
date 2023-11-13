import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { Item } from 'app/models/item.model';
import { ItemService } from 'app/services/item.service';
import { PlaceholderItems } from 'app/models/placeholder-model';


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule, MatRippleModule, MatButtonModule, MatGridListModule, MatCardModule, MatIconModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  item: Item | null = null;

  private itemSubscription!: Subscription;

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
    })
  }

  ngOnInit() {
    this.itemSubscription = this.itemService.getItem().subscribe(item => {
      if(item != null) {
        this.item = item;
      }
    })
  }

  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }

  tiles: any[] = [];
  tilesTypes = ['Recipe', 'Item', 'Notes'];

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

}
