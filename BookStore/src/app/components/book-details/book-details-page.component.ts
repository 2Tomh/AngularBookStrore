import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BooksService } from '../../services/books.service'
import { CartService } from '../../services/cart.service'
import { Book } from '../../models/book.models'
@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.css']
})
export class BookDetailsPageComponent implements OnInit {
  book!: Book
  cartMessage: string | null = null
  isLoading: boolean = true


  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private cartService: CartService) { }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')

    if (idParam) {
      const bookId = Number(idParam)

      this.bookService.getBookId(bookId).subscribe({
        next: (data) => {
          if (data) {
            this.book = data
            this.isLoading = false
          }
        },
        error: (err) => {
          console.error('Book not found', err)
          this.isLoading = false
        }
      })
    }
  }

  calculatePrice(price: number, discount: number): number {
    return this.bookService.CalculatePrice(price, discount);
  }
  addBookToCart(book: Book): void {
    this.cartService.addToCart(book)
    this.cartMessage = `${book.title} was added to cart`
    setTimeout(() => {
      this.cartMessage = null
    }, 3000)
  }
}
