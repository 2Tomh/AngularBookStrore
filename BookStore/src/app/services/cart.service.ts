import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { CartItem } from '../models/cartItem.model';
import { Book } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]); 
  public _cartItems: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  
  private DB_URL = environment.DB.trim();

  constructor(
    private http: HttpClient,
    private loginService: LoginService 
  ) {
    this.loginService.userChanged.pipe(
      switchMap(user => {
        if (user && this.loginService.token) {
          return this.cartFromDB(user.id, this.loginService.token);
        } else {
          this.cartItemsSubject.next([]);
          return new Observable<CartItem[]>(observer => observer.next([]));
        }
      })
    ).subscribe(items => {
      if (items) {
        this.cartItemsSubject.next(items);
      }
    });
  }

  private cartFromDB(userId: string, token: string): Observable<CartItem[]> {
    return this.http.get<any>(`${this.DB_URL}/carts/${userId}/items.json?auth=${token}`)
      .pipe(
        map(res => {
          return Object.keys(res || {}).map(key => ({
            key: key,
            ...res[key]
          }));
        })
      );
  }

  private saveCartToFirebase(items: CartItem[]): Observable<any> {
    const user = this.loginService.myUser;
    const token = this.loginService.token;

    if (!user || !token) return new Observable(observer => observer.next(null));

    const firebaseItems: { [key: string]: Omit<CartItem, 'key'> } = {};
    items.forEach(item => {});
    return this.http.put(`${this.DB_URL}/carts/${user.id}/items.json?auth=${token}`, items);
  }
  addToCart(book: Book): void {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(bookItem => bookItem.book._id === book._id);
    let updatedItems: CartItem[];

    if (item) {
      item.quantity++;
      updatedItems = [...currentItems];
    } else {
      updatedItems = [...currentItems, { book, quantity: 1 } as CartItem];
    }
    
    this.cartItemsSubject.next(updatedItems); 
    this.saveCartToFirebase(updatedItems).subscribe();
  }

  removeFromCart(bookId: string): void { 
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.book._id !== bookId);

    this.cartItemsSubject.next(updatedItems); 
    this.saveCartToFirebase(updatedItems).subscribe();
  }

  updateQuantity(bookId: string, quantity: number): void {
    if (quantity < 1) return;
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.book._id === bookId);

    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartToFirebase(currentItems).subscribe();
    }
  }
  
  clearCart(): void {
    this.cartItemsSubject.next([]); 
    const user = this.loginService.myUser;
    const token = this.loginService.token;
    if (user && token) {
      this.http.put(`${this.DB_URL}/carts/${user.id}/items.json?auth=${token}`, null).subscribe();
    }
  }
  getTotal(): number {
    return this.cartItemsSubject.getValue().reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }
}