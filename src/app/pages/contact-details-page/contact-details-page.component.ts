import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, take, tap, of, combineLatest, filter, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MsgService } from '../../services/msg.service';

@Component({
    selector: 'contact-details-page',
    standalone: false,

    templateUrl: './contact-details-page.component.html',
    styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private userService = inject(UserService)
    private locationService = inject(Location)
    private msgService = inject(MsgService)
    private subscription!: Subscription

    user$ = this.userService.loggedInUser$
    contact: Contact | null = null

    contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
    
    contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
        filter(([user]) => !!user),
        map(([user, contact]) => (user?.moves || []).filter(move => move.toContactId === contact._id))
    )
    // ------------------------------------
    // How to get when not using resolvers:
    // contact$!: Observable<Contact>
    // ------------------------------------

    ngOnInit(): void {
        // --------------------------------
        // Useful when not using Resolvers:
        // this.contact$ = this.route.params.pipe(
        //   switchMap(params => this.contactService.getContactById(params['contactId']))
        // --------------------------------
        // )
        this.subscription = this.contact$.subscribe(contact => this.contact = contact)
    }
    onBack() {
        this.locationService.back()
    }
    // ------------------------------------
    //   Examples of Navigate from function:
    //   this.router.navigate(['/pet'], {queryParams:{a:1,b:2}})
    //   this.router.navigateByUrl('/pet')
    // ------------------------------------
    
    onTransferCoins(amountToTransfer: number){
        console.log(this.contact);
        
        if (!this.contact) {
            this.msgService.setErrorMsg('No contact selected for coin transfer');
            return
        }

        this.userService.addMove(this.contact, amountToTransfer)
            .pipe(take(1))
            .subscribe({
                next: () =>{
                    this.msgService.setSuccessMsg(
                        'Transferred ' + amountToTransfer +' coins to ' + this.contact?.name
                    )
                },
                error: (err :unknown) => {
                    console.log('Error occured while transferring coins',err)
                }
                
            })
    }

    ngOnDestroy():void{
        this.subscription.unsubscribe()
    }
}
