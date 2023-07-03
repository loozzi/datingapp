import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { LightgalleryModule } from 'lightgallery/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';

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
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ToastrModule,
    MatTabsModule,
    LightgalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
