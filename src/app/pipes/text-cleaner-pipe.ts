import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCleaner',
})
export class TextCleanerPipe implements PipeTransform {

 transform(value: any[] | null): string {
    if (!value) return '';
    return value.map(item => item.text).join(' ');
  }

}
