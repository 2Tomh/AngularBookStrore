import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { LoginService } from './login.service'
import { CartItem } from '../models/cartItem.model'
import { Book } from '../models/book.models'
import { User } from '../models/user.models'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([])
  public _cartItems = this.cartItemsSubject.asObservable()

  private DB_URL = environment.DB.trim()

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.UserChanged.pipe(
      switchMap((user: User | null) => {
        if (user && user.id) {
          return this.cartFromDB(user.id)
        }
        return new Observable<CartItem[]>(obs => obs.next([]))
      })
    ).subscribe((items: CartItem[]) => {
      this.cartItemsSubject.next(items || [])
    })
  }

  private cartFromDB(userId: number | string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.DB_URL}/Carts/${userId}`)
  }

  private saveCartTOApi(items: CartItem[]): Observable<any> {
    const user = this.loginService.myUser
    if (!user) return new Observable(obs => obs.next(null))
    const itemsToSave = items.map(item => ({
      bookId: item.book.id,    
      quantity: item.quantity,
      userId: user.id         
    }));
    return this.http.put(`${this.DB_URL}/Carts/${user.id}`, itemsToSave)
  }

  addToCart(book: Book): void {
    const items = this.cartItemsSubject.value
    const exisitngItem = items.find(item => item.book.id === book.id)
    if (exisitngItem) {
      exisitngItem.quantity += 1
    } else {
      items.push({ book: book, quantity: 1 })
    }
    this.cartItemsSubject.next([...items])
    this.saveCartTOApi(items).subscribe()
  }

  removeFromCart(bookId: number): void {
    const currentItems = this.cartItemsSubject.getValue()
    const updatedItems = currentItems.filter(item => item.book.id !== bookId)

    this.cartItemsSubject.next(updatedItems)
    this.saveCartTOApi(updatedItems).subscribe()
  }

  updateQuantity(bookId: number, quantity: number): void {
    if (quantity < 1) return
    const currentItems = this.cartItemsSubject.getValue()

    const item = currentItems.find(i => i.book.id === bookId)

    if (item) {
      item.quantity = quantity
      this.cartItemsSubject.next([...currentItems])
      this.saveCartTOApi(currentItems).subscribe()
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([])
    const user = this.loginService.myUser
    if (user) {
      this.saveCartTOApi([]).subscribe()
    }
  }
  getTotal(): number {
    return this.cartItemsSubject.getValue().reduce((sum, item) => {
      const price = item.book?.price || 0
      return sum + (price * item.quantity)
    }, 0)
  }
  getUser() {
    return this.loginService.myUser;
  }
  processCheckout(userId: number): Observable<any> {
    return this.http.post(`${this.DB_URL}/Carts/checkout/${userId}`, {});
  }
}