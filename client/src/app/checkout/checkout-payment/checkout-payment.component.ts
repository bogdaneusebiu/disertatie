import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/Models/basket';
import { IOrder } from 'src/app/shared/Models/order';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy{

  @Input() checkoutForm : FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardError: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid= false;
  cardExpiryValid= false;
  cardCvcValid= false;

  constructor (private basketService: BasketService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) {}

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51PcGVTIAcwmX3xz93U24Z76aI2PiEYitD3yOhlsbbShqLnUKMTpAZA9rFr8hFP5Ln87FflaxB1NKFcD11vQaTJt500fE7T933i');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event) {
    console.log(event)
    if (event.error){
      this.cardError = event.error.message;
    } else {
      this.cardError = null;
    }

    switch(event.elementType)
    {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  async submitOrder (){
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    try{
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent){
        this.basketService.deleteBasket(basket.id);
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }

      this.loading = false;

    }catch (error){
      console.log(error);
      this.loading = false;
    }

  }

  private async confirmPaymentWithStripe(basket : IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret,{
      payment_method: {
        card: this.cardNumber,
        billing_details:{
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }

  private async createOrder(basket: IBasket){
    const orderToCreate = this.getOrderToCreate(basket);

    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  getOrderToCreate(basket : IBasket) {
    return {
      basketId : basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shippingAddress:  this.checkoutForm.get("addressForm").value
    };
  }
}
