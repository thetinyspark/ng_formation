import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _connected:boolean = false;
  constructor() {
  }

  public login():void{
    this._connected = true;
  }
  
  public isConnected():Promise<boolean>{
    return Promise.resolve(this._connected);
  }

  public getUserData():Promise<any>{
    return Promise.resolve({
      name : "Gandalf", 
      age: 3000
    });
  }
}
