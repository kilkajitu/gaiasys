import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import {HttpClientService} from './api.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
@Injectable()
export class AuthenticationService {
  ackMsg = '';
  ackHead = '';
  change = 1;
  menuState = new BehaviorSubject('');
  logoState = new BehaviorSubject('logo');
  menuItems = this.menuState.asObservable();
  schoolLogo = this.logoState.asObservable();
  constructor(private httpService: HttpClientService, private tokenService: TokenService, private router: Router) {

  }
  sessionExpired(modal, header: string, msg: string) {
    this.ackHead = 'Session Expired';
    this.ackMsg = 'Please login Again';
    header = 'Session Expired';
    msg =  'Please login Again';
    modal.show();
  }
  getOtp(oldPassword): Observable<any> {
    return this.httpService.post<any>(environment.API_ENDPOINT + '/getOTP', {data: oldPassword});
  }

  logout(): boolean {
    this.tokenService.setUpOnLogin(null);
    this.router.navigate(['/']);
    return false;
  }

}
