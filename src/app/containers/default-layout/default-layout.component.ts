import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItemsAdmin,navItemsUser } from '../../_nav';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers:[AuthenticationService]
})
export class DefaultLayoutComponent implements OnDestroy {
  public role = Number(localStorage.getItem('role'));
  public navItemsAdmin = navItemsAdmin;
  public navItemsUser = navItemsUser;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(public authenticationService: AuthenticationService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout(){
    this.authenticationService.logout();
  }
}
