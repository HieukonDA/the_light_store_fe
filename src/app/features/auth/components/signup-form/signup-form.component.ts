import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RegisterDto } from '../../../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup-form.component.html',
  styles: ``,
})
export class SignupForm implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  agreeTerms = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const signupRequest: RegisterDto = {
      userName: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.authService.register(signupRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data && response.data[0]?.isSuccess) {
          // Đăng ký thành công → Redirect về login
          this.router.navigate(['/auth/login']);
        } else {
          this.errorMessage = response.data?.[0]?.message || 'Đăng ký thất bại';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Lỗi server. Vui lòng thử lại';
      },
    });
  }
}
