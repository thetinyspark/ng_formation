import { Injectable } from '@angular/core';
import { delay, interval, map, Observable, of, ReplaySubject, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor() { }
  public run():void{

    // créer un observable à partir de données synchrones à l'aide de l'opérateur of
    /*
    const sub = of(["Amandine","Alexis","Idriss","Giampaolo","Nidhal","Robin","Vincent"]).pipe(
      delay(5000) // ralentit la diffusion des données
    ).subscribe( 
      (data:string[])=>{
        console.log(data);
      }
    );

    // on se désinscrit de l'abonnement au flux
    sub.unsubscribe();


    const obs = new Observable( 
      (observer)=>{
        window.fetch("assets/json/cart.json").then( 
          async (resp)=>{
            const json = await resp.json();
            observer.next(json);
            observer.complete();
          }
        )
      }
    ).subscribe( 
      (data)=>{
        console.log(data);
      }
    ); 

    // subject combine le meilleur des deux mondes
    // on peut lire et on peut écrire dans la source de données
    const subj = new Subject<number>();
    subj.subscribe(console.log);
    subj.subscribe(
      (data:number)=>{
        console.log( Math.round(data * 10));
      }
    );


    // setInterval( 
    //   ()=>{
    //     subj.next(Math.random());
    //   }, 
    //   1000
    // ); 




    const sub2 = new Observable( 
      (observer)=>{
        var num = 10;
        var myInterval = setInterval( 
          ()=>{
            if( num > 0 ){
              console.log("coucou");
              observer.next(Math.random());
              num--;
            }
            else{
              // ne pas oublier de compléter le flux
              // afin de bien nettoyer la mémoire
              observer.complete();
              clearInterval(myInterval);
            }
          }, 
          1000
        );

        // retourne une fonction à déclencher au moment du unsubscribe
        return ()=>{
            observer.complete();
            clearInterval(myInterval);
        };

      }
    ).subscribe( 
      (data)=>{
        console.log(data);
      }
    ); 

    sub2.unsubscribe();
    */

    const names = ["Amandine","Alexis","Idriss","Giampaolo","Nidhal","Robin","Vincent"];
    // const subj = new Subject(); 
    // const subscription = subj.subscribe(console.log);
    // var myInterval = setInterval( 
    //   ()=>{
    //     if(names.length > 0 )
    //       subj.next(names.shift());
    //     else{
    //       subj.complete();
    //       clearInterval(myInterval); 
    //       subscription.unsubscribe();
    //     }
    //   }, 
    //   1000
    // );

    // const subscription = interval(1000).pipe( take(names.length)).pipe( map( (index)=>names[index])).subscribe(console.log);
    // of("").pipe( delay(2100)).subscribe( ()=>subscription.unsubscribe());
    // setTimeout( 
    //   ()=>{
    //     subscription.unsubscribe();
    //   }, 
    //   4200
    // )

    // solution au TP n°7

    // const prices = [10,20,30,40];
    // const rp = new ReplaySubject<number>();

    // const sub1 = rp.subscribe((data:number)=>console.log(data+"€ HT"));
    // const sub2 = rp.subscribe((data:number)=>console.log( (data*1.2)+"€ TTC"));

    // interval(1000).pipe( take(prices.length)).pipe( map((index)=>rp.next(prices[index])) ).subscribe();
    // of("").pipe( delay(prices.length * 1000)).subscribe( ()=>{
    //   rp.complete();
    //   sub1.unsubscribe();
    //   sub2.unsubscribe();
    // });
  }
}
