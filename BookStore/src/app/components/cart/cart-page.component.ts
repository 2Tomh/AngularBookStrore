import { Component, OnInit } from '@angular/core'
import { CartItem } from '../../models/cartItem.model'
import { CartService } from '../../services/cart.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  _cartItems: Observable<CartItem[]>
  total$: Observable<number>
  checkoutMessage: string | null = null
  checkoutSuccess: boolean = false

  constructor(private cartService: CartService) {
    this._cartItems = this.cartService._cartItems
    this.total$ = this._cartItems.pipe(
      map(items => this.cartService.getTotal())
    )
  }

  ngOnInit(): void {
  }

  removeItem(bookId: number): void {
    this.cartService.removeFromCart(bookId)
  }

  updateQuantity(bookId: number, quantity: number): void {
    const numQuantity = Number(quantity)
    if (numQuantity < 1 || isNaN(numQuantity)) return

    this.cartService.updateQuantity(bookId, numQuantity);
  }

  checkOut(): void {
    const user = this.cartService.getUser();

    if (!user || !user.id) {
      this.checkoutMessage = "Please log in to make a purchase";
      return;
    }

    const userIdAsNumber = Number(user.id);

    this.cartService.processCheckout(userIdAsNumber).subscribe({
      next: (res: any) => {
        this.checkoutMessage = `Order placed successfully! Total to pay: ${res.total} ₪`;
        this.checkoutSuccess = true;
        this.cartService.clearCart();
        setTimeout(() => this.checkoutMessage = null, 5000);
      },
      error: (err) => {
        console.error(err);
        this.checkoutMessage = "An error occurred during the payment process. Please try again";
        this.checkoutSuccess = false;
      }
    });
  }


}