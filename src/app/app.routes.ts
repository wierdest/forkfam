import { Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ItemComponent } from './components/item/item.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutComponent } from './components/about/about.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'welcome', component: StartComponent, title: 'Hi, there!', data: { animation: 'WelcomePage'} },

    { 
        path: 'home', component: HomeComponent, title: 'Home', data: { animation: 'HomePage'} ,
        canActivate: [authGuard]
    },

    { 
        path: 'farewell', component: LogoutComponent, title: 'Bye!', data: { animation: 'LogoutPage'} ,
        canActivate: [authGuard]
    },

    { 
        path: 'search', component: SearchComponent, title: 'Search', data: { animation: 'SearchPage'} ,
        canActivate: [authGuard]
    },

    { 
        path: 'item/:id', component: ItemComponent, title: 'Yummy!', data: { animation: 'ItemPage'} ,
        canActivate: [authGuard]
    },

    { 
        path: 'about', component: AboutComponent, title: 'Goals', data: { animation: 'AboutPage'} ,
        // canActivate: [authGuard]
    },

    { path: '', redirectTo: 'welcome', pathMatch: 'full' },

    { path: '**', component: PageNotFoundComponent, title: '404 Not Found', data: { animation: 'PageNotFoundPage'} }

];
