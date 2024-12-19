import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.models';
import { UserService } from '../services/user.service';
import { BitcoinService } from '../services/bitcoin.service';
import { Contact } from '../models/contact.model';
import { error } from 'echarts/types/src/util/log.js';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ex-mister-bitcoin';
  private bitcoinService = inject(BitcoinService)
  private userService = inject(UserService)
  private contactService = inject(ContactService)
  private subscription!: Subscription

  user?: User | null = this.userService.getUser()

  bitcoinMarketPrice?: number
  page: string = 'home'
  contacts?: Contact[] | undefined
  tradeVolume?: object

  ngOnInit(): void {
    this.subscription = this.contactService.loadContacts()
      .subscribe({
        error(err){
          console.log('err: ', err);
          
        }
      })

    this.bitcoinService.getMarketPrice().subscribe({
      next: (price: number) => this.bitcoinMarketPrice = price
    })

    this.bitcoinService.getTradeVolume().subscribe({
      next: (vol: object) => this.tradeVolume = vol
    })
  }

}
