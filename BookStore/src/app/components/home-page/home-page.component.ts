import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  displayedBooks: Book[] = [];
  cartMessage: string | null = null;

  constructor(private booksService: BooksService,
    public cartService: CartService,) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(books => {
        this.displayedBooks = books;
    });
  }

  onSearchChanged(books: Book[]): void {
    this.displayedBooks = books;
  }

  addBookToCart(book: Book): void {
    this.cartService.addToCart(book)
    this.cartMessage = `${book.title} added to cart`
    setTimeout(() => {
      this.cartMessage = ''
    }, 3000)
  }
}
