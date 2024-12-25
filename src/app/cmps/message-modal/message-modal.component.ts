import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { MsgService } from '../../services/msg.service';
import { Observable } from 'rxjs';
import { Msg } from '../../models/msg.model';

@Component({
    selector: 'message-modal',
    standalone: false,

    templateUrl: './message-modal.component.html',
    styleUrl: './message-modal.component.scss',
    animations: [
        trigger('toggleMsg', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0%' }),
                animate('0.3s ease-in-out', style({ transform: 'translateY(-100%' }))
            ])
        ])
    ]
})
export class MessageModalComponent {
    private msgService = inject( MsgService)
    constructor() { }

    msg$: Observable<Msg | null> = this.msgService.msg$

    onCloseMsg() {
        this.msgService.closeMsg()
    }

}
