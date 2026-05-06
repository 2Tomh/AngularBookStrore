import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../app/services/login.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { AdminInfoComponent } from './admin-info/admin-info.component'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admin: any
  users: any[] = []
  books: any[] = []
  isModalOpen = false
  DB_URL = environment.DB.trim()
  newBook: any = { title: '', author: '', price: null, imageUrl: '', description: '' }

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    const currentAdmin = this.loginService.myUser
    if (!currentAdmin || !currentAdmin.isAdmin) {
      if (!currentAdmin || !currentAdmin.isAdmin) {
        console.error("Access denied: Not an admin")
        return
      }
    }

    this.admin = { ...currentAdmin }
    this.loadUsers()
    this.loadBooks()
  }

  onOpenModal(modal: any) {
    if (modal instanceof AdminInfoComponent) {
      modal.closeModal.subscribe(() => {
        this.isModalOpen = false
      })
    }
  }
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }

  saveAdminChanges() {
    this.http.put(`${this.DB_URL}/Users/${this.admin.id}`, this.admin)
      .subscribe({
        next: () => {
          console.log("Admin info saved successfuly")
        },
        error: (err) => {
          console.error("Failed to save Admin info", err)
        }
      })
  }

  loadUsers() {
    this.http.get<any[]>(`${this.DB_URL}/Users/all-users`).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => console.error("Error loading users:", err)
    });
  }

  setDiscount(userId: number, discount: number) {
    this.http.put(`${this.DB_URL}/Users/set-discount/${userId}`, { discount })
      .subscribe({
        next: () => {
          console.log(`Discount set`);
          this.loadUsers();
        },
        error: (err) => console.error("Failed to set discount", err)
      });
  }

  loadBooks() {
    this.http.get<any[]>(`${this.DB_URL}/Books`).subscribe(res => {
      this.books = res;
    });
  }

  addBook() {
    this.http.post(`${this.DB_URL}/Books`, this.newBook)
      .subscribe(() => this.loadBooks())
    this.newBook = { title: '', author: '', price: null, imageUrl: '', description: '' }
  }

  editBook(bookId: any, updatedBook: any) {
    this.http.put(`${this.DB_URL}/Books/${bookId}`, updatedBook)
      .subscribe(() => this.loadBooks());
  }

  deleteBook(bookId: string) {
    this.http.delete(`${this.DB_URL}/books/${bookId}`)
      .subscribe(() => this.loadBooks())
  }


  onFileSelected(event: any, book: any, isNew: boolean = false) {
    const file: File = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      book.imageUrl = base64

      if (!isNew && book.id) {
        this.editBook(book.id, book)
      }
    }
    reader.readAsDataURL(file)
  }

  deleteBookImage(book: any) {
    book.imageUrl = ''
    this.editBook(book.id, book)
  }

  logout() {
    this.loginService.logout()
  }
}