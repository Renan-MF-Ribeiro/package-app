import {
  Component,
  OnInit,
  forwardRef,
  HostListener,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
} from '@angular/forms';

import { ImageEditorComponent } from '../image-editor.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'lib-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputImageComponent),
      multi: true,
    },
  ],
})
export class InputImageComponent implements ControlValueAccessor {
  @Input()
  formControlName!: string;
  @Input()
  formGroup!: FormGroup;
  @Input()
  isBanner: boolean = false;
  @Input() small = false;

  @Input() list: boolean = false;
  @Output() imageOutput = new EventEmitter();

  @Input() target: string = 'Thumb';

  touched: boolean = false;
  image: string | ArrayBuffer | null = null;
  defaultImage: string = '../../../assets/image/icone-adiciona-imagem.png';
  defaultImageBanner: string =
    '../../../assets/image/icone-adiciona-banner.jpg';
  onChange!: Function;
  isDisabled: boolean = false;

  @ViewChild('inputField', { read: ElementRef, static: true })
  input!: ElementRef;

  constructor(public dialog: MatDialog) {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (file && file.type.match(/image\//)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.openEditor(reader.result).subscribe((result: any) => {
          this.imageOutput.emit(result);
          this.formGroup.get(this.formControlName)?.setValue(result);
          if (!this.list) this.image = result;
        });
      };
      reader.readAsDataURL(file);
    } else {
      // Default image.
      this.image = null;
    }

    this.onChange(file);
    this.input.nativeElement.value = '';
  }

  getStatusControl() {
    const control = this.formGroup.get(this.formControlName);
    if (control) {
      control.markAllAsTouched();
      control.updateValueAndValidity();
      this.touched = control.touched;
    }
  }

  openEditor(data: any) {
    return this.dialog
      .open(ImageEditorComponent, {
        width: '100vw',
        height: '100vh',
        panelClass: 'panelEditImage',
        data: { img: data, target: this.target },
      })
      .afterClosed();
  }

  writeValue(value: string): void {
    if (value) {
      this.image = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  clickInput() {
    if (this.input.nativeElement && !this.isDisabled) {
      this.input.nativeElement.click();
    }
  }

  getErrorMessage(): string {
    const control = this.formGroup.get(this.formControlName);
    if (control)
      return control.hasError('required')
        ? 'Campo obrigatório'
        : control.hasError('passwordsNotMatching')
        ? 'Senhas não são iguais'
        : control.hasError('email')
        ? 'Email inválido'
        : control.hasError('maxlength')
        ? 'Número de caracteres ultrapassados'
        : control.hasError('minlength')
        ? 'Número de caracteres não atingido'
        : control.hasError('max')
        ? 'Valor maior que o permitido'
        : control.hasError('min')
        ? 'Valor menor que o permitido'
        : control.hasError('pattern')
        ? 'Campo inválido'
        : control.hasError('invalid')
        ? 'Campo inválido'
        : control.hasError('cnpj')
        ? 'CNPJ inválido'
        : control.hasError('cpf')
        ? 'CPF inválido'
        : control.hasError('blank')
        ? 'Existe um espaço no ínicio do campo'
        : control.hasError('requiredFileType')
        ? 'Arquivo inválido'
        : '';
    return '';
  }
}
