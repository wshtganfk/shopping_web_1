import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { orderService } from '../service/order.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  constructor(
    private orderService: orderService,
    private cd: ChangeDetectorRef,
    private router:Router
){}
  ngOnInit(): void {
    this.orderService.GetOrderByUserToken().subscribe(data => {
      console.log("data"+ data.data)
      this.list = data["data"];
    })

  }

  list:Array<any> = [];
  productList:Array<detailProduct> = [];
  total_price:number = 0;

  toCancel(order_id:bigint){
    this.orderService.CancelOrder(order_id).subscribe(data =>{
      alert(data["message"]);
    })
    this.orderService.GetOrderByUserToken().subscribe(data => {
      console.log("data"+ data.data)
      this.list = data["data"];
      this.cd.detectChanges();
    })    
  }
  
  toDetail(order_id:bigint){
    this.orderService.GetOrderById(order_id).subscribe(data => {
      console.log(data["data"])
      this.total_price = 0;
      this.productList = data["data"];
      this.productList.forEach(e =>{
        this.total_price = this.total_price + (e.quantity * e.retail_price);
      })
    })
  }
  toComplete(order_id:bigint){
    this.orderService.CompleteOrder(order_id).subscribe(e => {
      alert(e["message"]);
    })
    this.orderService.GetOrderByUserToken().subscribe(data => {
      console.log("data"+ data.data)
      this.list = data["data"];
      this.cd.detectChanges();
    })   

  }

}

interface detailProduct{
  product_id:BigInt;
  description: string,
  name: string,
  quantity: number,
  retail_price: number,
  wholesale_price: number
}
