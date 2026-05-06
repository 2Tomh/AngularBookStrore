import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { BooksService } from '../../../app/services/books.service';
import { Book } from '../../../app/models/book.models'

@Component({
  selector: 'app-book-discount',
  templateUrl: './book-discount.component.html',
  styleUrls: ['./book-discount.component.css']
})
export class BookDiscountComponent implements OnInit {

  books: Book[] = []
  DB_URL = environment.DB
  constructor(private http: HttpClient, private booksService: BooksService) { }

  ngOnInit(): void {
    this.loadDiscountedBooks();
  }
  loadDiscountedBooks() {
    this.booksService.getBooksWithDiscount().subscribe(res => {
      this.books = res
    })
  }
  calculateDiscountedPrice(price: number | undefined, discount: number | undefined) {
    return this.booksService.CalculatePrice(price, discount).toFixed(2)
  }
  setDiscount(book: any) {
    const actualId = book.id || book._id;
    if (!actualId) {
      return;
    }

    if (book.newDiscount === undefined) {
      return;
    }

    book.discountPercentage = book.newDiscount;

    book.Id = actualId;

    this.http.put(`${this.DB_URL}/Books/${actualId}`, book).subscribe({
      next: () => {
        this.loadDiscountedBooks();
      },
      error: (err) => console.error("Faild to load Discount", err)
    });
  }
  updateDiscount(book: any) {
    if (!book.id) return

    this.http.put(`${this.DB_URL}/Books/${book.id}`, book).subscribe({
      next: () => {
        alert("Discount updated")
        this.loadDiscountedBooks()
      }
    })
  }

}
