import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alpha',
  standalone: true
})
export class AlphaPipe implements PipeTransform {

  transform(data:string[]): string[] {
    return data.sort();
  }

}
