import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BooksService, Book } from '../../services/books.service'
import { CartService } from '../../services/cart.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.css']
})
export class BookDetailsPageComponent implements OnInit {
  book!: Book
  cartMessage: string | null = null
  isLoading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private cartService: CartService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')
    this.bookService.getBooks().pipe(
      map((books: Book[]) => books.find(b => b._id === bookId))
    ).subscribe(book => this.book = book)
  }

  addBookToCart(book: Book): void {
    this.cartService.addToCart(book)
    this.cartMessage = `${book.title} was added to cart`
    setTimeout(() => {
      this.cartMessage = null
    }, 3000)
  }
}
