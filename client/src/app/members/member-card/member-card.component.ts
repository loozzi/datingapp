import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;
  username: string = '';

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.username = this.member?.userName || (this.member as any).username;
  }

  addLike(member: any): void {
    this.memberService
      .addLike(member.userName || member.username)
      .subscribe(() => {
        this.toastr.success('You have liked '.concat(member.knownAs));
      });
  }
}
