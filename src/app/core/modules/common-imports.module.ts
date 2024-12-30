import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardNoMaskPipe } from '../pipes/masking.pipe';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ClipboardModule,
    MatIconModule,
    CardNoMaskPipe,
    MatButtonModule,
    MatFormFieldModule,
    
  ],
  exports: [
    CommonModule,
    ClipboardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    CardNoMaskPipe,

  ],
})
export class CommonImportsModule {}
