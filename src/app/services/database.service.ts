import { Injectable } from '@angular/core';
import { Item } from 'app/models/item.model';
import { User } from 'app/models/user.model';
import { JwtPayload } from 'app/models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: IDBDatabase | null = null;
  // database is extremely simple
  private storeName: string = 'users';
  private keyPath: string = 'sub'

  openDatabase(databaseName: string, version: number) : Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      const request = indexedDB.open(databaseName, version);
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if(!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: this.keyPath});
          // I don't think we need any indexes right now
        }
      }

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        // Create the USERS store
        const transaction = this.db!.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
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

  getUser(keyPathValue: string): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database has not been opened yet!'));
        return;
      }
  
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
  
      const getRequest = store.get(keyPathValue);
  
      getRequest.onsuccess = (event: any) => {
        const user = event.target.result;
        resolve(user);
      };
  
      getRequest.onerror = (error) => {
        console.error(`Error getting user with keyPath ${keyPathValue}:`, error);
        reject(error);
      };
  
      transaction.onerror = (error) => {
        console.error('Error opening transaction:', error);
        reject(error);
      };
    });
  }

  private createUser(sub: string, googleUserInfo: JwtPayload, offers: Item[], orders: Item[]): User {
    return {
      sub: sub,
      googleUserInfo: googleUserInfo,
      offers: offers,
      orders: orders,
    };
  }

  addNewUser(sub: string, googleUserInfo: JwtPayload, offers: Item[], orders: Item[]): Promise<void> {
    const user = this.createUser(sub, googleUserInfo, offers, orders);
    return this.addUser(user);
  }

  private addUser(user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database has not been opened yet!'));
        return;
      }
  
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
  
      const addRequest = store.add(user);
  
      addRequest.onsuccess = () => {
        console.log('Success in adding user!')

        resolve();
      };
  
      addRequest.onerror = (error) => {
        console.error('Error adding user:', error);
        reject(error);
      };
  
      transaction.onerror = (error) => {
        console.error('Error opening transaction:', error);
        reject(error);
      };
    });
  }

  removeUser(keyPathValue: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database has not been opened yet!'));
        return;
      }
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
  
      const deleteRequest = store.delete(keyPathValue);
  
      deleteRequest.onsuccess = () => {
        resolve();
      };
  
      deleteRequest.onerror = (error) => {
        console.error(`Error removing user with keyPath ${keyPathValue}:`, error);
        reject(error);
      };
  
      transaction.onerror = (error) => {
        console.error('Error opening transaction:', error);
        reject(error);
      };
    });
  }

  clearDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        // Handle the case where the database is not open yet.
        reject(new Error('Database is not open.'));
        return;
      }
  
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      // Clear all data in the 'tracks' object store.
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        console.log('Database cleared.');
      };

      transaction.oncomplete = () => {
        resolve();
      };
  
      transaction.onerror = (event: any) => {
        console.error('Error clearing database:', event.target.error);
        reject(event.target.error);
      };
  
    });
  }
}
