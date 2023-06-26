import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    MatTabsModule,
    LightgalleryModule,
    NgxSpinnerModule,
  ],
  exports: [ToastrModule, MatTabsModule, LightgalleryModule, NgxSpinnerModule],
})
export class SharedModule {}
