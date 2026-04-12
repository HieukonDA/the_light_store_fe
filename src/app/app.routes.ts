import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '',
        loadComponent: () => import('./features/home/pages/home-page/home-page.component').then(m => m.HomePage)
    }
];
