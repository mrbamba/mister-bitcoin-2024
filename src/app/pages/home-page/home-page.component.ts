import { Component, inject, input, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'home-page',
    standalone: false,

    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    private bitcoinService = inject(BitcoinService)
    private userService = inject(UserService)
    private router = inject(Router)
    user?: User | null = this.userService.getLoggedInUser()

    bitcoinMarketPrice?: number

    userMoves = (this.userService.getLoggedInUser())?.moves.slice(0, 3)
    ngOnInit() {
        this.bitcoinService.getMarketPrice().subscribe({
            next: (price: number) => this.bitcoinMarketPrice = price
        })
        // console.log(this.user);


    }



    onLogout() {
        this.userService.logout()
            .pipe(take(1))
            .subscribe({
                next: () => this.router.navigate(['/signup']),
                error: (err) => console.log('Error', err),
            })
    }
}
