import { Component, Input, input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Move } from '../../models/move.model';

@Component({
    selector: 'move-list',
    standalone: false,

    templateUrl: './move-list.component.html',
    styleUrl: './move-list.component.scss'
})
export class MoveListComponent {
    _contact!: Contact
    title: string = 'Last 3 moves'

    @Input() moves!: Move[]

    @Input() set contact(contact: Contact | null) {
        if (contact) {
            const spaceIdx = contact.name.indexOf(' ')
            const nameLength = contact.name.length
            this.title = 'Your moves to ' + contact.name.slice(0, spaceIdx < 0 ? nameLength : spaceIdx)
        }
    }
}
