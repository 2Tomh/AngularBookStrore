import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  DB_URL = environment.DB.trim();

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(`${this.DB_URL}/books.json`)
      .pipe(
        map(res => {
          return Object.keys(res || {}).map(key => ({
            _id: key,
            ...res[key]
          }));
        })
      );
  }

  getBookId(id: string): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map(books => books.find(book => book._id === id))
    );
  }
}
