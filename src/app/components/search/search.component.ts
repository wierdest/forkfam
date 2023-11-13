import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { SearchResultComponent } from '../search-result/search-result.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Item } from 'app/models/item.model';
import { ItemService } from 'app/services/item.service';
import { PlaceholderItems } from 'app/models/placeholder-model';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { BubblesComponent } from 'app/components/svg-components/bubbles/bubbles.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule,  MatFormFieldModule, MatChipsModule, MatButtonModule, 
  SearchResultComponent, BubblesComponent, DragDropModule, MatCardModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchComponent {
  value = '';
  searchAutofilled: boolean = false;

  placeHolderSearchResults: Item[] = PlaceholderItems.getItems();

  constructor(private itemService: ItemService) {}
    
  drop(event: CdkDragDrop<any[]>): void {
    // Handle the drop event with the array of cards
    const draggedData = event.item.data;
    // Identify the element using the data
  }

  pickItem(value: number) {

    this.itemService.setItem(this.placeHolderSearchResults[value])
    
  }


}
