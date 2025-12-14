import {Book} from '../services/books.service'

export interface CartItem{
    book: Book
    quantity: number
}