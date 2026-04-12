import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../services/auth/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  console.log('Interceptor đang xử lý link:', req.url);

  // 1. Thêm baseURL vào request
  let apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`
  });

  // 2. Thêm token vào Authorization header (nếu tồn tại)
  const token = authService.getToken();
  if (token) {
    apiReq = apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Token đã được thêm vào request');
  }

  return next(apiReq);
};
