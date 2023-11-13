import { Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CompleteRegistrationComponent } from './components/complete-registration/complete-registration.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ItemComponent } from './components/item/item.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
    { path: 'welcome', component: StartComponent, title: 'Hi, there!', data: { animation: 'WelcomePage'} },

    { path: 'success', component: CompleteRegistrationComponent, title: 'Yay!!!', data: { animation: 'YayPage'} },

    { path: 'home', component: HomeComponent, title: 'Home', data: { animation: 'HomePage'} },

    { path: 'farewell', component: LogoutComponent, title: 'Bye!', data: { animation: 'LogoutPage'} },

    { path: 'search', component: SearchComponent, title: 'Search', data: { animation: 'SearchPage'} },

    { path: 'item/:id', component: ItemComponent, title: 'Yummy!', data: { animation: 'ItemPage'} },

    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    
    { path: '**', component: PageNotFoundComponent, title: '404 Not Found', data: { animation: 'PageNotFoundPage'} }

];
