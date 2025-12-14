import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  _cartItems: Observable<CartItem[]>;
  total$: Observable<number>;
  checkoutMessage: string | null = null;
  checkoutSuccess: boolean = false;

  constructor(private cartService: CartService) {
    this._cartItems = this.cartService._cartItems;
    this.total$ = this._cartItems.pipe(
      map(items => this.cartService.getTotal())
    );
  }

  ngOnInit(): void {
  }

  removeItem(bookId: string): void {
    this.cartService.removeFromCart(bookId);
  }

  updateQuantity(bookId: string, quantity: number): void {
    const numQuantity = Number(quantity);
    if (numQuantity < 1 || isNaN(numQuantity)) return;

    this.cartService.updateQuantity(bookId, numQuantity);
  }

  checkOut(): void {
    const currentTotal = this.cartService.getTotal();

    this.checkoutMessage = `Thank you for your purchase! Total amount: ${currentTotal.toFixed(2)} ₪.`;
    this.cartService.clearCart();
    this.checkoutSuccess = true;
    setTimeout(() => {
      this.checkoutMessage = null;
    }, 5000);
  }
}