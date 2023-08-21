import { NgModule } from '@angular/core';
import { ImageEditorComponent } from './components/image-editor.component';
import { InputImageComponent } from './components/input-image/input-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ImageEditorComponent, InputImageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ],
  exports: [InputImageComponent],
})
export class ImageEditorModule {}
