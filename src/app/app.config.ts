import { ApplicationConfig, Injectable, InjectionToken, importProvidersFrom } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`forkfam | ${title}`);
    }
  }
}

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        }
      })
    ),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    // provideAuth0({ 
    //   domain: 'dev-uwl5kocjwl1evkxu.us.auth0.com',
    //   clientId: 'sW5wQuA3dpKM4pDtcjf1kYC8iJWW7E1P',
    //   authorizationParams: { redirect_uri: 'http://localhost:4200/success' }
    // })
  ]
};


