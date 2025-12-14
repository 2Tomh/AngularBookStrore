import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // נשאר כי אתה משתמש בו בתוך הפונקציות
import { LoginService } from '../../../../services/login.service';
import { environment } from '../../../../../environments/environment';
import { Book, BooksService } from '../../../../services/books.service'
import { Observable } from 'rxjs'; // נדרש אם תשתמשו ב-Observables מה-Service

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.css']
})
export class BooksManagerComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { 
    title: '', 
    author: '', 
    price: 0, 
    imageUrl: '', 
    description: '',
    };

  DB_URL = environment.DB

  constructor(private http: HttpClient, private loginService: LoginService, private booksService: BooksService) { } 

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    }, error => {
        console.error("Error loading books:", error);
    });
  }

  addBook() {
    const { _id, ...bookToSend } = this.newBook;
    
    this.http.post(`${this.DB_URL}/books.json?auth=${this.loginService.token}`, bookToSend)
      .subscribe(() => {
        this.loadBooks();
        this.newBook = { title: '', author: '', price: 0, imageUrl: '', description: ''};
      }, error => {
          console.error("Error adding book:", error);
      });
  }

  saveChanges(book: Book) {
    const dataToSave = { ...book };
    const bookId = dataToSave._id;
    delete dataToSave._id;
    if (!bookId) {
        console.error("Cannot edit book: _id is missing.");
        return;
    }
    
    this.http.patch(
      `${this.DB_URL}/books/${bookId}.json?auth=${this.loginService.token}`,
      dataToSave
    ).subscribe(() => this.loadBooks(), 
       error => {
           console.error(`Error editing book ${bookId}:`, error);
       });
  }

  deleteBook(id: string) {
    this.http.delete(`${this.DB_URL}/books/${id}.json?auth=${this.loginService.token}`)
      .subscribe(() => this.loadBooks(),
       error => {
           console.error(`Error deleting book ${id}:`, error);
       });
  }
  
  onFileSelected(event: any, book: any, isNew = false) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      book.imageUrl = reader.result as string;
      if (!isNew) this.saveChanges(book as Book); 
    };
    reader.readAsDataURL(file);
  }

  deleteImage(book: any) {
    book.imageUrl = '';
    this.saveChanges(book as Book);
  }

}