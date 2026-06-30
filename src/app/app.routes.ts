import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m=>m.Dashboard), canActivate: [authGuard]
    },
    {
        path: 'login', loadComponent: () => import('./pages/login/login').then(m=>m.Login)
    },
    {
        path: 'process', loadComponent: () => import('./pages/process/process').then(m=>m.Process)
    },
    {
        path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m=>m.NotFound)
    },
];
