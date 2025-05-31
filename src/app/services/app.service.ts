import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _connected:boolean = false;
  private _userData:any = {
      name : "Gandalf", 
      age: 3000,
      lastActive: -1
  }
  constructor() {
  }

  public login():void{
    this._userData.lastActive = Date.now();
    this._connected = true;
  }
  
  public isConnected():Promise<boolean>{
    return Promise.resolve(this._connected);
  }

  public getUserData():Promise<any>{
    return Promise.resolve(this._userData);
  }
}
