import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { IUser, IUserWithAddress } from 'src/app/shared/Models/user';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/Models/address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  accountForm: FormGroup;
  user$: Observable<IUser>;

  constructor(private fb: FormBuilder, private accountService: AccountService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.createCheckoutFrom();
    this.getAddress();
    this.getAccount();
    this.user$ = this.accountService.currentUser$;
  }

  createCheckoutFrom()
  {
    this.accountForm = this.fb.group({
        firstName:[null, Validators.required],
        lastName:[null, Validators.required],
        street:[null, Validators.required],
        city:[null, Validators.required],
        judet:[null, Validators.required],
        zipCode:[null, Validators.required],
        phoneNumber:[null, Validators.required],
        email:[null, Validators.required],
        displayName:[null, Validators.required]
      });
  }

  getAddress()
  {
    this.accountService.getUserAddress().subscribe(address =>{
      if (address){
        console.log(address)
        this.accountForm.patchValue(address);
      }
    }, error =>{
      console.log(error);
    })
  }

  getAccount(){
    this.accountService.getCurrentUser().subscribe(response =>{
      if (response){
        console.log(response)
        this.accountForm.patchValue(response);
      }
    }, error =>{
      console.log(error);
    })
  }

  saveUserChanges()
  {
    this.accountService.updateUserAccount(this.accountForm.value).subscribe((response) =>{
      this.toastr.success('User changes saved');
    }, error =>{
      this.toastr.error(error.message);
      console.log(error);
    })
  }

}
