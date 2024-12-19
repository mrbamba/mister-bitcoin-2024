import { ResolveFn } from '@angular/router';
import { Contact } from '../models/contact.model';
import { inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { LoaderService } from '../services/loader.service';
import { delay, finalize } from 'rxjs';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const contactId = route.params['contactId']
  const contactService = inject(ContactService)
  const loaderService = inject(LoaderService)
  loaderService.setIsLoading(true)
  return contactService.getContactById(contactId).pipe(
    delay(500),
    finalize(() => loaderService.setIsLoading(false))
  )

};
