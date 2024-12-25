import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { MsgService } from '../../services/msg.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'transfer-coins',
    standalone: false,

    templateUrl: './transfer-coins.component.html',
    styleUrl: './transfer-coins.component.scss'
})
export class TransferCoinsComponent {
    private msgService = Inject(MsgService)

    amount?: number

    @Input() contact!: Contact
    @Input() maxCoins!: number
    @Output() transferCoins = new EventEmitter

    onTransferCoins(): void {
        if (!this.amount || this.maxCoins < this.amount) {
            this.msgService.setErrorMsg('Not enough coins')
        } else {
            this.transferCoins.emit(this.amount)
        }
        this.amount = undefined
    }
}