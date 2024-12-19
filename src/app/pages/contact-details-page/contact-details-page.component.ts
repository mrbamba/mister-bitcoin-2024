import { Component, inject, Input, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-details-page',
  standalone: false,

  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute)
  // private router = inject(Router)
  // private contactService = inject(ContactService)
  private locationService = inject(Location)

  contact$ : Observable<Contact> = this.route.data.pipe(map(data =>data['contact']))
  
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
  }
  onBack() {
    this.locationService.back()
}
// ------------------------------------
//   Examples of Navigate from function:
//   this.router.navigate(['/pet'], {queryParams:{a:1,b:2}})
//   this.router.navigateByUrl('/pet')
// ------------------------------------
}
