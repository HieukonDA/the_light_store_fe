export interface LoginDto {
  userName: string;
  password: string;
}

export interface MeDto {
  userId?: string;
  employeeCode?: string;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  sex?: string;
  birthday?: string;
  address?: string;
  note?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
  isActive?: boolean;
  roleType?: string;
}

export interface LoginResponse {
  accessToken?: string;
  message?: string;
  isSuccess?: boolean;
  user?: MeDto;
  refreshToken?: string;
}

export interface LoginResponseSlim {
  accessToken?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}

export interface RegisterDto {
  userName: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  isSuccess?: boolean;
  user?: MeDto;
  confirmEmailLink?: string;
}

export interface ConfirmEmailDto {
  otp: string;
  email: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  isSuccess: boolean;
  message?: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface ResetPasswordDto {
  sessionKey: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
  address: string;
  sex?: boolean;
  birthday?: Date;
}

export interface OauthDto {
  userId: string;
  providerName: string;
  email: string;
  fullName: string;
}

export interface OauthResponse extends LoginResponse {
  providerUserName?: string;
  providerUserEmail?: string;
}

export interface ResendOtpDto {
  email: string;
}