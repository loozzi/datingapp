import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AccountService } from '../_services/account.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // perform authentication logic here and return an Observable
    return this.accountService.currentUser$.pipe(
      map((user: any) => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator'))
          return true;
        this.toastr.error('You shall not pass');
        return false;
      })
    );
  }
}
