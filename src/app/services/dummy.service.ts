import { computed, Injectable } from '@angular/core';
import { combineLatest, delay, forkJoin, interval, map, Observable, of, ReplaySubject, Subject, take } from 'rxjs';
import {toSignal, toObservable} from '@angular/core/rxjs-interop';

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

    const usersData = [
      {
        id: 1, 
        name: "John"
      },
      {
        id: 2, 
        name: "Gandalf"
      }
    ];

    const usersCitationsData = [
      {
        userId: 1, 
        citation: "Tu ne sais rien du tout Jean Neige"
      },
      {
        userId: 2, 
        citation: "Un magicien n'est jamais en retard Frodon Sacquet, ni en avance d'ailleurs, il arrive précisemment à l'heure prévue."
      }
    ];

    // on se dit que le serveur répond au bout de 5s
    const obs1 = of(usersData).pipe( delay(5000));

    // on se dit que le serveur répond au bout de 2s
    const obs2 = of(usersCitationsData).pipe( delay(2000));

    // forkJoin attend que tout soit terminé, en parallèle
    // combineLatest combiner les dernières valeurs dès lors que l'une d'elle change
    // zip Combine, les valeurs une par une, dans l'ordre
    // merge, qui permet d'intercaler les valeurs sans aucune synchronisation

    /*
    const obs3 = forkJoin({profile: obs1, citations: obs2}).pipe(
      map( 
        (obj:any)=>{
          const profile = obj.profile;
          const citations = obj.citations;

          profile.forEach(
            (currentProfile:any)=>{
              currentProfile["citation"] = citations.find( (c:any)=>c.userId == currentProfile.id)?.citation || "";
            }
          ); 

          return profile;
        }
      )
    ).subscribe(console.log);
    */
    // UNE API en temps réel, qui diffuse le prix d'un bien, les prix sont extrêmement volatiles et peuvent 
    // changer très rapidement. On simule cette écoute en temps réel par le biais d'un observable qui diffuse 
    // des données toutes les 100ms prices$;

    // UNE API en temps réel, diffuse, elle, le taux de TVA applicable au bien qui nous intéresse. 
    // le gouvernement vote des lois plus vite que son ombre et peut changer la TVA toutes les 100ms.
    // Cette diffusion en temps réel de la TVA est simulée par tva$


    const prices = [10,20,30,40]; 
    const tva = [5.5,20];

    // on obtient nos prix volatiles en temps réel
    const prices$ = interval(200).pipe( take(prices.length)).pipe(map( i=>prices[i]));
    // on obtient la TVA en temps réel
    const tva$ = interval(150).pipe( take(tva.length)).pipe(map( i=>tva[i]));

    /*
    combineLatest({price: prices$, tva:tva$}).pipe( 
      map((obj:any)=>{
        return {total: obj.price * (1+(obj.tva*0.01)), price:obj.price, tva:obj.tva};
      })
    ).subscribe(
      {
        error:  (error)=>console.log, 
        next: (data)=>{
          console.log("current Data:",data);
        }, 
        complete:()=>{
          console.log("completed !");
        }
      }
    );
    */

    // const obs$ = of(["coucou","le","monde"]).pipe( delay(4000));
    const obs$ = new Subject<number>();
    const signalMsg = toSignal(obs$, {initialValue: 0});


    const totalAchat = computed(
      ()=>{
        return signalMsg() + 10;
      }
    );

    
    setTimeout( ()=>obs$.next(20), 1000);
    setTimeout( ()=>obs$.next(30), 2000);
    setTimeout( ()=>obs$.next(40), 3000);

    setInterval( ()=>console.log(totalAchat()), 500 );

   toObservable(signalMsg).subscribe(
    (data)=>{
      console.log("Nouvel achat: "+data);
    }
   );
  }
}
