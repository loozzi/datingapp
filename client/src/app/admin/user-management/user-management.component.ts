import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/User';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users?: Partial<any[]>;

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users) => {
      this.users = users;
    });
  }

  openDialog(user: any) {
    const dialogRef = this.dialog.open(RolesModalComponent, {
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (this.users && result) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]?.username === user.username) {
            this.users[i].roles = result
              .filter((r) => r.checked)
              .map((r) => r.value);
          }
        }
      }
    });
  }
}
