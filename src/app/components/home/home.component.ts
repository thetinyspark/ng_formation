import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { delay, interval, map, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  private _detector:ChangeDetectorRef = inject(ChangeDetectorRef);
  public num:number = 0;
  constructor(
  ){
    interval(10).pipe( map(()=>this.num++)).subscribe();

    interval(1000).subscribe( 
      ()=>{
        this._detector.markForCheck();
      }
    );
  }
}