import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ResponseRecord } from '../../../shared/interfaces/common.interface';
import { LoginDto, LoginResponse, RegisterDto, RegisterResponse } from '../../../shared/interfaces/auth.interface';
import API from '../../constants/paths';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  
  // BehaviorSubject để track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Kiểm tra có token hay không (SSR safe)
  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') {
      return false; // Server-side: không có localStorage
    }
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Hàm check đăng nhập
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // Lấy token hiện tại
  getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Login
  login(request: LoginDto): Observable<ResponseRecord<LoginResponse>> {
    return this.http.post<ResponseRecord<LoginResponse>>(
      API.API_AUTH_LOGIN,
      request
    ).pipe(
      tap(response => {
        if (response.data?.isSuccess && response.data?.accessToken) {
          // Lưu token vào localStorage
          localStorage.setItem(this.TOKEN_KEY, response.data.accessToken);
          if (response.data.refreshToken) {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, response.data.refreshToken);
          }
          // Cập nhật authentication state
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Logout
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
  }

  register(request: RegisterDto): Observable<ResponseRecord<RegisterResponse[]>> {
    return this.http.post<ResponseRecord<RegisterResponse[]>>(
      API.API_AUTH_REGISTER,
      request
    );
  }
}
