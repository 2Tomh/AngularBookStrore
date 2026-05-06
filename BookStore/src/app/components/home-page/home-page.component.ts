import { Component, OnInit } from '@angular/core'
import { BooksService } from '../../services/books.service'
import { CartService } from '../../services/cart.service'
import { Book } from '../../models/book.models'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  displayedBooks: Book[] = []
  cartMessage: string | null = null
  currentPage: number = 1
  pageSize: number = 8

  constructor(private booksService: BooksService,
    public cartService: CartService,) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(books => {
      this.displayedBooks = books
    })
  }
  calculatePrice(price: number, discount: number): number {
    const finalPrice = this.booksService.CalculatePrice(price, discount);
    return Math.round(finalPrice)
  }
  onSearchChanged(books: Book[]): void {
    this.displayedBooks = books
    this.currentPage = 1;
  }

  addBookToCart(book: Book): void {
    this.cartService.addToCart(book)
    this.cartMessage = `${book.title} added to cart`
    setTimeout(() => {
      this.cartMessage = ''
    }, 3000)
  }

  get paginatedBooks(): Book[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.displayedBooks.slice(startIndex, startIndex + this.pageSize)
  }

get totalPages(): number {
  return Math.floor((this.displayedBooks.length + this.pageSize - 1) / this.pageSize);
}

  changePage(step: number): void {
    this.currentPage += step;
    window.scrollTo(0, 0)
  }
}
