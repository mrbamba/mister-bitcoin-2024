import { Component, input, Input } from '@angular/core';
import { User } from '../../models/user.models';

@Component({
  selector: 'home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @Input() user?: User
  @Input() bitcoinMarketPrice?: number

  
}
