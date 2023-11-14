import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from 'app/models/jwt-payload.model';
import { environment } from 'environments/environment';
import { Observable, Subject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenStatusSubject: Subject<string | null> = new Subject<string | null>();
  tokenStatus$: Observable<string | null> = this.tokenStatusSubject.asObservable();

  private _hasToken: boolean = !!localStorage.getItem('g_token');
  // use this to easily decode the token
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem("g_token");
    this._hasToken = false; // Set to false when the token is removed
    this.tokenStatusSubject.next(null); // Notify about token status change
    console.log("Token deleted");
  }

  public get hasToken(): boolean {
    // Expose the current token status
    return this._hasToken;
  }

  public saveTokenToLocalStorage(token: string): void {
    localStorage.setItem('g_token', token);
    this._hasToken = true;
    this.tokenStatusSubject.next(token);
  }

  public decodeTokenFromLocalStorage(): any {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem('g_token');
    if (storedToken) {
      // Decode the token and return the decoded payload
      return this.jwtHelper.decodeToken(storedToken);
    } else {
      // Handle the case where the token is not found
      return null;
    }
  }

  // Update the method to return JwtPayload
  public getDecodedTokenInfo(): JwtPayload | null {
    // Get the decoded payload from the token
    const decodedToken = this.decodeTokenFromLocalStorage();

    // Cast the decoded token to JwtPayload or return null if not found
    return decodedToken as JwtPayload;
  }
}

