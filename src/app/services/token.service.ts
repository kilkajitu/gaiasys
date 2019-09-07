import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class TokenService {
  constructor(public jwtHelper: JwtHelperService) {}
  public getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
  public getRole(): string {
    if (localStorage.getItem('role')) {
      return localStorage.getItem('role');
    } else {
      return '0';
    }
  }
  public setUpOnLogin(result: any): void {
    if (result && result.token && result.token.length > 0) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.role);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.jwtHelper.isTokenExpired();
  }
}
