import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { BooksService, Book } from '../../services/books.service'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  allBooks: Book[] = [] 
  search: string = ''
  searchResult: Book[] = []
  @Output() searchChanged = new EventEmitter<Book[]>()

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks()
      .pipe(
        catchError(error => {
          console.error('Failed to load books for search:', error)
          return of([])
        })
      )
      .subscribe(books => {
        this.allBooks = books
        this.searchResult = [...this.allBooks]
        this.searchChanged.emit(this.searchResult)
      })
  }

  onSearch(): void {
    const query = this.search.toLowerCase().trim()
    if (!query) {
      this.searchResult = [...this.allBooks]
    } else {
      this.searchResult = this.allBooks.filter(book =>
        book.title.toLowerCase().trim().includes(query) ||
        book.author.toLowerCase().trim().includes(query)
      )
    }
    this.searchChanged.emit(this.searchResult);
  }
}