import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { MsgService } from '../../services/msg.service';


@Component({
  selector: 'contact-edit-page',
  standalone: false,

  templateUrl: './contact-edit-page.component.html',
  styleUrl: './contact-edit-page.component.scss'
})
export class ContactEditPageComponent implements OnInit{
  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private locationService = inject(Location)
  private msgService = inject(MsgService)

  
  contact = this.contactService.getEmptyContact()
  
  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => !!contact),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(contact =>{
      this.contact = contact
    })
    // ---------------------------------
    // When not using resolver:
    // this.route.params.pipe(
    //   map(params => params['contactId']),
    //   filter(contactId => !!contactId),
    //   switchMap(contactId => this.contactService.getContactById(contactId)),
    //   takeUntilDestroyed(this.destroyRef)
    // ).subscribe(contact => {
    //   this.contact = contact
    // })
    // ---------------------------------
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact as Contact)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err: ', err),
        complete: () => {
            this.msgService.setSuccessMsg('Contact ' + ((this.contact._id)? ' edited ':' created ') + 'successfully')
            this.onBack()
        }
      })
  }
  onBack() {
    this.locationService.back()
}
}