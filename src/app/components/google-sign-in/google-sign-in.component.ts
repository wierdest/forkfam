import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-google-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.css'
})
export class GoogleSignInComponent {

  private clientId = environment.clientId

  private tokenStatusSubscription!: Subscription;
  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone,) {}

    ngOnInit() {
       // @ts-ignore
       window.onGoogleLibraryLoad = () => {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          ux_mode: "popup",
          cancel_on_tap_outside: true
        });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", width: "100%", shape:"pill" } 
        );
        // @ts-ignore
        // google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      };

      this.tokenStatusSubscription = this.service.tokenStatus$.subscribe((token) => {
        if(token) {
          // Do something with the token, e.g., navigate to a specific route
          this._ngZone.run(() => {
            this.router.navigate(['/home']);
          })
        } else {
          console.log('Token is not present');
          // Handle the case where the token is not present
        }

      })
    }

    ngOnDestroy() {
      this.tokenStatusSubscription.unsubscribe();
    }

    async handleCredentialResponse(response: CredentialResponse) {
      this.service.saveTokenToLocalStorage(response.credential);
    }

}
