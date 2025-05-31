import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  public user:any = {};
  public connectedSince:string ="";
  private currentTime = signal<number>(-1);

  constructor(){
    this.user = this.route.snapshot.data['user'];

    effect(
      ()=>{
        const diff = this.currentTime() - this.user.lastActive;
        const secondsPerMin = 60;
        const minsPerHour = 60;
        const hoursPerDay = 24; 
        const secondsPerDay = secondsPerMin * minsPerHour * hoursPerDay;
        const secondsPerHour = secondsPerMin * minsPerHour;
        
        let totalSeconds = Math.floor( diff / 1000);
        
        const days = Math.floor(totalSeconds / secondsPerDay );
        totalSeconds -= days * secondsPerDay;

        const hours = Math.floor(totalSeconds / secondsPerHour );
        totalSeconds -= hours * secondsPerHour;

        const mins = Math.floor(totalSeconds / secondsPerMin );
        totalSeconds -= mins * secondsPerMin;

        const seconds = totalSeconds;

        this.connectedSince = `Connecté depuis: ${days}:${hours}:${mins}:${seconds}`
      }
    );

    this.currentTime.set(Date.now());
  }

  public refresh(){
    this.currentTime.set(Date.now());
  }
}
