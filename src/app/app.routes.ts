import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './pages/dashboard/auth-guard';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./pages/dashboard/dashboard').then(m=>m.Dashboard), canActivate: [authGuard]
    },
    {
        path: 'login', loadComponent: () => import('./pages/login/login').then(m=>m.Login)
    },
    {
        path: '**', redirectTo: 'login'
    }
];
