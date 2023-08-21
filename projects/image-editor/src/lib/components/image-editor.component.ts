import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-image-editor',
  template: ` <div id="tui-image-editor"></div> `,
  styles: [
    `
      .panel {
        padding: 0;
      }
    `,
  ],
})
export class ImageEditorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImageEditorComponent>
  ) {}

  imageEditor: any;
  // ImageEditor(a:any,b:anny)
  ngOnInit(): void {
    const ImageEditor = require('projects/image-editor/assets/image-editor/tui-image-editor');
    this.imageEditor = new ImageEditor('#tui-image-editor', {
      includeUI: {
        loadImage: {
          path: this.data.img,
          name: 'SampleImage',
        },
        locale: this.locale_pt_BR,
        initMenu: 'crop',
        menuBarPosition: 'right',
        usageStatistics: false,

        download: this.saveImage,
        dialogRef: this.dialogRef,
      },
    });
    setTimeout(() => {
      this.imageEditor.setCropzoneRect(this.getProporcao(this.data.target));
    }, 1000);
  }

  saveImage(imageData: any) {
    this.dialogRef.close(imageData);
    console.log('download', imageData);
  }

  getProporcao(parametro: string): number | null {
    const proporcoes: any = {
      Banner: 1948 / 420,
      Thumb: 51 / 37,
      // adicionar mais casos aqui, se necessário
    };

    return proporcoes[parametro] || null;
  }
  locale_pt_BR = {
    // override default English locale to your custom
    Crop: 'Cortar',
    DeleteAll: 'Deletar todos',
    Delete: 'Deletar',
    Custom: this.data.target,
    Square: 'Quadrado',
    Apply: 'Aplicar',
    Cancel: 'Cancelar',
    ZoomIn: 'Aproximar',
    ZoomOut: 'Afastar',
    History: 'Historico',
    Undo: 'Desfazer',
    Redo: 'Refazer',
    Reset: 'Resetar',
    Resize: 'Redimenssionar',
    Width: 'Largura',
    Height: 'Altura',
    'Lock Aspect Ratio': 'Travar proporção',
    Download: 'Concluír',
    Load: 'Carregar Imagem',
    Hand: 'Mover',
    'Flip X': 'Espelhar Horizontal',
    'Flip Y': 'Espelhar Vertical',
    Flip: 'Espelhar',
    Rotate: 'Girar',
    Draw: 'Desenhar',
    Free: 'Livre',
    Straight: 'Linha',
    Color: 'Cor',
    Shape: 'Forma',
    Rectangle: 'Retângulo',
    Circle: 'Círculo',
    Triangle: 'Triângulo',
    Stroke: 'Borda',
    Fill: 'Preenchimento',
    Icon: 'Ícone',
    Arrow: 'Seta',
    'Arrow-2': 'Seta-2',
    'Arrow-3': 'Seta-3',
    'Star-1': 'Estrela',
    'Star-2': 'Estrela-2',
    Polygon: 'Polígono',
    Location: 'Localização',
    Heart: 'Coração',
    Bubble: 'Balão',
    'Custom icon': 'Ícone customizado',
    Text: 'Texto',
    Bold: 'Negrito',
    Italic: 'Italico',
    Underline: 'Sublinhado',
    Left: 'Esquerda',
    Center: 'Centro',
    Right: 'Direita',
    'Text size': 'Tamanho do Texto',
    Mask: 'Máscara',
    'Load Mask Image': 'Carregar imagem de máscara',
    Filter: 'Filtro',
    Grayscale: 'Escala em Cinza',
    Invert: 'Negativo',
    Blur: 'Desfoque',
    Sharpen: 'Nitidez',
    Emboss: 'Relevo',
    'Remove White': 'Remover Branco',
    Distance: 'Grau',
    Brightness: 'Brilho',
    Noise: 'Ruído',
    Pixelate: 'Pixelado',
    'Color Filter': 'Filtro de Cor',
    Threshold: 'Limite',
    Tint: 'Tonalidade',
    Multiply: 'Multiplicar',
    Blend: 'Misturar',
    Value: 'Valor',
  };
}
