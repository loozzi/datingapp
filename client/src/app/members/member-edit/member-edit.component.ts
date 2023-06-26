import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member?: Member;
  user?: User | null;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ): void {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accoutService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accoutService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.memberService
      .getMember(this.user?.username || '')
      .subscribe((member) => (this.member = member));
  }

  updateMember(): void {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    });
  }
}
