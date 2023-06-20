import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http
      .get('https://localhost:7264/api/users', {
        headers: { Accept: 'application/json' },
      })
      .subscribe(
        (res) => (this.users = res),
        (error) => {
          console.log(error);
        }
      );
  }
}
