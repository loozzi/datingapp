import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import lgZoom from 'lightgallery/plugins/zoom';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, AfterViewChecked {
  member: Member | undefined;
  needRefresh: boolean = false;
  lightGallery: any;

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }

  settings = {
    counter: false,
    plugins: [lgZoom],
  };

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.membersService
      .getMember(this.route.snapshot.paramMap.get('username') || '')
      .subscribe((member) => {
        this.member = member;
      });
  }

  onInit = (detail: any): void => {
    this.lightGallery = detail.instance;
  };
}
