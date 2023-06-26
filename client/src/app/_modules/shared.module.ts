import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

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
    FileUploadModule,
  ],
  exports: [
    ToastrModule,
    MatTabsModule,
    LightgalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
  ],
})
export class SharedModule {}
