import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { BooksService } from '../../services/books.service'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { Book } from '../../models/book.models'
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
      .pipe(catchError(error => { return of([]) }))
      .subscribe(books => {
        this.allBooks = books;
        this.searchResult = [...this.allBooks];
        this.updateView();
      })
  }

  onSearch(): void {
    const query = this.search.toLowerCase().trim();
    
    if (!query) {
      this.searchResult = [...this.allBooks];
    } else {
      this.searchResult = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
    this.updateView();
  }

  updateView(): void {
    this.searchChanged.emit(this.searchResult);
  }
}