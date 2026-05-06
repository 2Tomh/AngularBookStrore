import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BooksService } from '../../../app/services/books.service'
import { Book } from '../../../app/models/book.models'

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.css']
})
export class BooksManagerComponent implements OnInit {
  books: Book[] = []
  newBook: Book = {
    title: '',
    author: '',
    price: undefined,
    imageUrl: '',
    description: '',
    discountPercentage: undefined
  }

  isAddModalOpen = false;
  editingBook: Book | null = null; 

  DB_URL = environment.DB

  constructor(private http: HttpClient, private booksService: BooksService) { }

  ngOnInit() {
    this.loadBooks()
  }

  loadBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books
    }, error => {
      console.error("Error loading books:", error)
    })
  }

  addBook() {
    const { id, ...bookToSend } = this.newBook
    this.http.post(`${this.DB_URL}/Books`, bookToSend).subscribe({
      next: () => {
        this.loadBooks()
        this.newBook = { title: '', author: '', price: undefined, imageUrl: '', description: '', discountPercentage: undefined };
        (document.getElementById('fileInput') as HTMLInputElement).value = ""
        this.isAddModalOpen = false;
      },
      error: (err) => console.error("Add failed", err)
    })
  }

  saveChanges(book: Book) {
    if (!book.id) return
    this.http.put(`${this.DB_URL}/Books/${book.id}`, book).subscribe({
      next: () => {
        this.loadBooks()
        this.editingBook = null
      },
      error: (err) => console.error("Update failed", err)
    })
  }

  deleteBook(id: any) {
    if (confirm("Are you sure?")) {
      this.http.delete(`${this.DB_URL}/Books/${id}`).subscribe(() => this.loadBooks())
    }
  }

  calculateDiscountedPrice(price: any, discount: any) {
    return this.booksService.CalculatePrice(price, discount)
  }

  onFileSelected(event: any, book: any, isNew = false) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      book.imageUrl = reader.result as string
      if (!isNew) this.saveChanges(book as Book)
    }
    reader.readAsDataURL(file)
  }

  deleteImage(book: any) {
    book.imageUrl = ''
    this.saveChanges(book as Book)
  }
  
}