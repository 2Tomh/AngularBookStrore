import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admin: any;
  users: any[] = [];
  books: any[] = [];
  DB_URL = environment.DB.trim();
  newBook: any = { title: '', author: '', price: null, imageUrl: '', description: '' };

  constructor(private loginService: LoginService, private http: HttpClient) {}

  ngOnInit(): void {
    const currentAdmin = this.loginService.myUser;
    if (!currentAdmin || !currentAdmin.isAdmin) return;

    this.admin = { ...currentAdmin };
    this.loadUsers();
    this.loadBooks();
  }

  // Admin Info
  saveAdminChanges() {
    this.http.patch(`${this.DB_URL}/users/${this.admin.id}.json?auth=${this.loginService.token}`, this.admin)
      .subscribe(() => console.log('Admin info saved successfully'));
  }

  // Users
  loadUsers() {
    this.http.get<any>(`${this.DB_URL}/users.json?auth=${this.loginService.token}`)
      .subscribe(res => {
        this.users = Object.keys(res || {}).map(key => ({ id: key, ...res[key] }));
      });
  }

  setDiscount(userId: string, discount: number) {
    this.http.patch(`${this.DB_URL}/users/${userId}.json?auth=${this.loginService.token}`, { discount })
      .subscribe(() => console.log(`Discount ${discount}% set for user ${userId}`));
  }

  // Books
  loadBooks() {
    this.http.get<any>(`${this.DB_URL}/books.json?auth=${this.loginService.token}`)
      .subscribe(res => {
        this.books = Object.keys(res || {}).map(key => ({ _id: key, ...res[key] }));
      });
  }

  addBook(newBook: any) {
    this.http.post(`${this.DB_URL}/books.json?auth=${this.loginService.token}`, newBook)
      .subscribe(() => this.loadBooks());
    this.newBook = { title: '', author: '', price: null, imageUrl: '', description: '' };
  }

  editBook(bookId: string, updatedBook: any) {
    this.http.patch(`${this.DB_URL}/books/${bookId}.json?auth=${this.loginService.token}`, updatedBook)
      .subscribe(() => this.loadBooks());
  }

  deleteBook(bookId: string) {
    this.http.delete(`${this.DB_URL}/books/${bookId}.json?auth=${this.loginService.token}`)
      .subscribe(() => this.loadBooks());
  }

  // Upload image as Base64
  onFileSelected(event: any, book: any, isNew: boolean = false) {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      book.imageUrl = base64;

      if (!isNew && book._id) {
        this.editBook(book._id, book);
      }
    };
    reader.readAsDataURL(file);
  }

  deleteBookImage(book: any) {
    book.imageUrl = '';
    this.editBook(book._id, book);
  }

  // Logout
  logout() {
    this.loginService.logOut();
  }
}