import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
  user: User;
  roles: any[] = [
    { name: 'Admin', value: 'Admin', checkek: false },
    { name: 'Moderator', value: 'Moderator', checkek: false },
    { name: 'Member', value: 'Member', checkek: false },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.user = data.user;
    this.user.roles?.forEach((r) => {
      for (let i = 0; i < this.roles.length; i++)
        if (this.roles[i].value === r) this.roles[i].checked = true;
    });
  }

  ngOnInit(): void {}

  updateRoles() {
    const rolesChanged = [];
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].checked) {
        rolesChanged.push(this.roles[i].value);
      }
    }
    this.adminService
      .updateUsersWithRoles(this.user.username || '', rolesChanged)
      .subscribe(() => {
        this.toastr.success('Users updated successfully');
      });
  }
}
