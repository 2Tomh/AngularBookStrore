import {Book} from '../models/book.models'

export interface CartItem{
    book: Book
    quantity: number
}