import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/Models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService){}

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe((address: IAddress) =>{
      this.toastr.success('Address saved');
      this.checkoutForm.get("addressForm").reset(address);
    }, error =>{
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
