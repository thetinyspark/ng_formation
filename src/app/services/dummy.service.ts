import { Injectable, numberAttribute } from '@angular/core';
import { combineLatest, concat, delay, forkJoin, from, interval, map, Observable, of, ReplaySubject, Subject, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor() { }

  public run():void{
    
    const usersData = [
      {id: 1, name: "John"},
      {id: 2, name: "Gandalf"}
    ];

    const usersQuotesData = [
      {
        userId: 1, 
        quote: "Tu ne sais rien du tout Jean Neige"
      },
      {
        userId: 2, 
        quote: "Un magicien n'est jamais en retard Frodon Sacquet, ni en avance d'ailleurs, il arrive précisemment à l'heure prévue."
      }
    ];

    const obs1 = of(usersData);
    const obs2 = of(usersQuotesData);

    forkJoin( {users:obs1, quotes:obs2} ).pipe( map(
      (obj:any)=>{
        
        const users = obj.users;
        const quotes = obj.quotes;

        users.forEach( 
          (currentUser:any)=>{
            currentUser.quote = quotes.find( (q:any)=>q.userId == currentUser.id);
          }
        );

        return users;

      }
    )).subscribe(console.log);

    // utiliser combineLatest pour produire une liste d'utilisateurs, chaque utilisateur doit se voir associé la bonne citation
    // le but est d'avoir un observable qui diffuse les données suivantes: 
    // ex:       {id: 1, name: "John", quote: "tu ne sais du tout Jean Neige"}
  }
}
