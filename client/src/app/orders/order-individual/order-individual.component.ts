import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrder } from 'src/app/shared/Models/order';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/Models/user';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-order-individual',
  templateUrl: './order-individual.component.html',
  styleUrls: ['./order-individual.component.scss']
})

export class OrderIndividualComponent implements OnInit{

  order: IOrder;
  user: IUser;
  datePipe: DatePipe;

  constructor(private oderService: OrdersService, private route: ActivatedRoute, private bcService: BreadcrumbService, private accountService:AccountService ) {
    this.bcService.set('@orderIndividual', '');
  }

  ngOnInit(): void {
    this.loadOrder();
    this.loadUser();
    console.log(this.user);
  }

  loadUser()
  {
    this.accountService.getCurrentUser().subscribe((response)=>{
      this.user = response;
      console.log(response.phoneNumber);
    }, error =>{
      console.log(error);
    })
  }

  loadOrder()
  {
    this.oderService.getIndividualOrderForUser(+this.route.snapshot.paramMap.get('id')).subscribe((response)=>{
      this.order= response;
      this.bcService.set('@orderIndividual', `Order# ${this.order.id}- ${this.order.status}`);
    }, error =>{
      console.log(error);
    })
  }

  makePdf(){
    let docDefinition = {
      content: [
        {
          text: 'ATUM MEDCARE',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.user.displayName,
                bold:true
              },
              { text: this.order.shipToAddress },
              { text: this.order.buyerEmail },
              { text: this.user.phoneNumber }
            ],
            [
              {
                text: `Date: ` + this.order.orderDate,
                alignment: 'right'
              },
              {
                text: `Bill No : ` + this.order.id,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.order.orderItems.map(p => ([p.productName, p.price, p.quantity, (p.price*p.quantity).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.order.total]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: 'The total prince includes the delivery fee of ' + this.order.shippingPrice + "lei",
            margin: [0, 0 ,0, 15]
        },
        {
          columns: [
            [{ qr: `${this.user.displayName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();

  }
}
