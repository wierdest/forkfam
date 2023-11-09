import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
    { path: 'welcome', component: StartComponent, title: 'Hi, there!', data: { animation: 'WelcomePage'} },
    { path: 'register', component: RegisterComponent, title: 'Register', data: { animation: 'RegisterPage'} },
    { path: 'success', component: CompleteRegistrationComponent, title: 'Yay!!!', data: { animation: 'YayPage'} },
    { path: 'login', component: LoginComponent, title: 'Welcome', data: { animation: 'LoginPage'} },
    { path: 'home', component: HomeComponent, title: 'Home', data: { animation: 'HomePage'} },

    { path: 'search', component: SearchComponent, title: 'Search', data: { animation: 'SearchPage'} },
    { path: 'item/:id', component: ItemComponent, title: 'Yummy!', data: { animation: 'ItemPage'} },

    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: '404 Not Found', data: { animation: 'PageNotFoundPage'} }

];
