import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../item/item.model';
import { ItemService } from '../item/item.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatCardModule, MatButtonModule, MatRippleModule,],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  
  @Input()item: Item | null = null;
  private itemSubscription!: Subscription;

  constructor(private itemService: ItemService) {}

  // ngOnInit() {
  //   this.itemSubscription = this.itemService.getItem().subscribe(item => {
  //     if(item != null) {
  //       this.item = item;
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.itemSubscription.unsubscribe();
  // }

  pickItem() {

    this.itemService.setItem(this.item!)
    
  }

}
