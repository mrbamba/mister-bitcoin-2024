import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-page',
  standalone: false,
  
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  private contactService = inject(ContactService)

  contacts$: Observable<Contact[]> = this.contactService.contacts$
  // filteredContacts: Contact[] = []
  // selectedContact: Contact | null = null
  // subscription: any;

  ngOnInit(){
    
    // this.subscription = this.contactService.loadContacts()
    //     .subscribe({
    //       error(err){
    //         console.log('err: ', err)
    //       },
    //       next:(contacts : Contact[]) => this.filteredContacts = contacts,
    //       // tap:(contacts : Contact[]) => this.filteredContacts = contacts
    //     })
    // // this.filteredContacts = [...this.contacts]
  }

  // onFilterChange(filterText: string){
  //   this.filteredContacts = this.contacts.filter((contact) =>
  //   contact.name.toLowerCase().includes(filterText.toLowerCase()))
  // }
  // updateSelectedContact(contactToSelect:Contact){
  //   this.selectedContact = contactToSelect
  // }
  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe()
  // }

}
