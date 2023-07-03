import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(
      this.baseUrl + 'admin/users-with-roles'
    );
  }

  updateUsersWithRoles(username: string, roles: string[]) {
    const rolesStr = roles.map((r) => r.trim()).join(',');

    return this.http.post(
      this.baseUrl
        .concat('admin/edit-roles/')
        .concat(username)
        .concat('?roles=')
        .concat(rolesStr),
      {}
    );
  }
}
