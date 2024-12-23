import { Component, inject, input, Input } from '@angular/core';
import { User } from '../../models/user.models';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private bitcoinService = inject(BitcoinService)
  private userService = inject(UserService)
  user?: User | null = this.userService.getUser()
  
  bitcoinMarketPrice?: number
  ngOnInit(){
    this.bitcoinService.getMarketPrice().subscribe({
      next: (price: number) => this.bitcoinMarketPrice = price
    })
    
  }
  onLogout() {
  
    this.userService.logout()
  }
}
