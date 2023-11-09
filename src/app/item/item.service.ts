import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemSubject: BehaviorSubject<Item | null> = new BehaviorSubject<Item | null>(null);

  getItem(): Observable<Item | null> {
    return this.itemSubject.asObservable();
  }
  setItem(item: Item | null): void {
    this.itemSubject.next(item);
  }
}
