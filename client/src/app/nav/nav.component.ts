import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      console.log(user);
    });
  }

  login(): void {
    this.accountService.login(this.model).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }

  logout(): void {
    this.accountService.logout();
  }
}
