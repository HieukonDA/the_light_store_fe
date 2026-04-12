import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoginDto } from '../../../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styles: ``,
})
export class LoginForm implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Vui lòng điền đầy đủ email/phone và password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginRequest: LoginDto = {
      userName: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data.isSuccess) {
          // Đăng nhập thành công → Redirect về home
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.data.message || 'Đăng nhập thất bại';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Lỗi server. Vui lòng thử lại';
      },
    });
  }
}
