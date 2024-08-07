import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/Models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  baskeTotal$: Observable<IBasketTotals>;

  constructor (private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) {}

  ngOnInit(): void {
    this.createCheckoutFrom();
    this.getAdrressFormValues();
    this.getDeliveryMethodValue();
    this.baskeTotal$ = this.basketService.basketTotal$;
  }

  createCheckoutFrom()
  {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName:[null, Validators.required],
        lastName:[null, Validators.required],
        street:[null, Validators.required],
        city:[null, Validators.required],
        judet:[null, Validators.required],
        zipCode:[null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard:[null, Validators.required]
      })
    });
  }

  getAdrressFormValues(){
    this.accountService.getUserAddress().subscribe(address =>{
      if (address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error =>{
      console.log(error);
    })
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();

    if(basket.deliveryMethodId !== null)
      {
        this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethodId.toString());
      }
  }

}
