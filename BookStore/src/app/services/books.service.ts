import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Book } from '../models/book.models'

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  DB_URL = environment.DB.trim()

  constructor(private http: HttpClient) { }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.DB_URL}/books`)
  }

  getBookId(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${this.DB_URL}/books/${id}`)
  }

  CalculatePrice(price: number | undefined, discount: number | undefined) {
    if (!price) return 0
    if (!discount || discount <= 0) return Math.round(price)
    const finalPrice = price * (1 - discount / 100)
    return Math.round(finalPrice * 100) / 100
  }
  getBooksWithDiscount() {
    return this.getBooks().pipe(
      map(books => books.filter(book => book.discountPercentage > 0))
    )
  }
}
