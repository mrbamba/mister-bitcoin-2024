import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactFilter } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'contact-filter',
  standalone: false,

  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {
  // @Output() filterChanged = new EventEmitter<string>()
  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)

  filterSubject$ = new Subject

  filterBy!: ContactFilter


  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        () => this.contactService.setFilterBy(this.filterBy)
      )
  }

  onFilterChange(filterValue: string) {
    console.log(this.filterBy);

    this.filterSubject$.next(filterValue)
  }
}
