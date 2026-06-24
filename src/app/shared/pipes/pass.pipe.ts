import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes',
})
export class PipesPipe implements PipeTransform {
  transform(value: string, type: 'star' | 'dash' | 'dot' | 'zero' = 'star'): unknown {
    const symb = {
      star: '*',
      dash: '-',
      dot: '•',
      zero: '0'
    }
    return value.split('').map(() => symb[type]).join('')
  }
}
