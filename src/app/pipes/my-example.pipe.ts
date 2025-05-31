import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myExamplePipe',
  standalone: true
})
export class MyExamplePipe implements PipeTransform {

  transform(data: any ): any {
    return data;
  }

}
