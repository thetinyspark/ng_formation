import { ResolveFn } from '@angular/router';
import { delay, firstValueFrom, forkJoin, interval, map, of, take } from 'rxjs';

export const timeoutResolver: ResolveFn<string> = async (route, state) => {
  const msg = "hello world"; 
  const numbers = [
    Math.round(Math.random()* 10),
    Math.round(Math.random()* 10),
    Math.round(Math.random()* 10),
    Math.round(Math.random()* 10)
  ]; 

  const obs$ = interval(150).pipe( take(numbers.length)).pipe( map(i=>numbers[i]));
  const obs2 = of("");

  return await firstValueFrom( forkJoin({a:obs$, b:obs2}).pipe( map(
    (obj:any)=>{
      return obj.a.toString();
    }
  )) );

  // return await firstValueFrom(of(msg).pipe(delay(2000)));
};
