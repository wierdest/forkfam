import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: IDBDatabase | null = null;

  openDatabase(databaseName: string, version: number) : Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      const request = indexedDB.open(databaseName, version);
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if(!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'sub'});
          // I don't think we need any indexes
        
        }
      }

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        const transaction = this.db!.transaction('users', 'readonly');
        const store = transaction.objectStore('users');
        const users: User[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (cursorEvent: any) => {
          const cursor = cursorEvent.target.result;
          if (cursor) {
            users.push(cursor.value);
            cursor.continue();
          } else {
            console.log(`Got all users: ${users}`);
          }
        };

        transaction.oncomplete = () => { resolve(users); }

        transaction.onerror = (error) => { 
          console.error('Error opening database:', error);
          reject(error);
        }
      }
    })
  }

}
