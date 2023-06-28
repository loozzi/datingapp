import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { LightgalleryModule } from 'lightgallery/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

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
    MatPaginatorModule,
  ],
  exports: [
    ToastrModule,
    MatTabsModule,
    LightgalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
})
export class SharedModule {}
