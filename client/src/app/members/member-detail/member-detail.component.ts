import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import lgZoom from 'lightgallery/plugins/zoom';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, AfterViewChecked {
  member: Member | undefined;
  needRefresh: boolean = false;
  lightGallery: any;
  tabIndex: number = 0;

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
    private memberService: MembersService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMember();
    this.route.queryParams.subscribe((params) => {
      switch (params?.['tab']) {
        case 'message':
          this.tabIndex = 3;
          break;
        case 'photos':
          this.tabIndex = 2;
          break;
        case 'interesting':
          this.tabIndex = 1;
          break;
        default:
          this.tabIndex = 0;
          break;
      }
    });
  }

  loadMember(): void {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username') || '')
      .subscribe((member) => {
        this.member = member;
      });
  }

  addLike(member: any): void {
    this.memberService.addLike(member.userName).subscribe(() => {
      this.toastr.success('You have liked '.concat(member.knownAs));
    });
  }

  onInit = (detail: any): void => {
    this.lightGallery = detail.instance;
  };
}
