import { Routes } from '@angular/router';
import { Auth } from './auth.component';
import { LoginForm } from './components/login-form/login-form.component';
import { SignupForm } from './components/signup-form/signup-form.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      { path: 'login', component: LoginForm },   // Nếu url là /auth/login -> nhét LoginForm vào router-outlet
      { path: 'signup', component: SignupForm }, // Nếu url là /auth/signup -> nhét SignupForm vào
      { path: '', redirectTo: 'login', pathMatch: 'full' } // Mặc định vào /auth thì tự nhảy sang /auth/login
    ]
  }
];
