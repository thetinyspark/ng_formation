import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf, 
    NgClass,
    NgStyle, 
    RouterLink, 
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

  private _subscription:Subscription|null = null;


  constructor(
  ){
  }
  
  ngOnInit(){}

  ngOnDestroy(){
  }
}