import { Component,OnInit,Input, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { productService } from '../../service/product.service';
import { FormBuilder } from '@angular/forms';
import { emptyValidator } from '../../empty.validator';

@Component({
  selector: 'app-child',
  templateUrl: './update-produce.component.html',
  styleUrl: './update-produce.component.css'
})
export class UpdateProduceComponent implements OnInit{
  @Input() inputFromParent : detailProduct | undefined;
  constructor(
    private router:Router,
    private productService:productService,
    private cd:ChangeDetectorRef
  ){}
  product : detailProduct | undefined;
  ngOnInit(): void {
    this.product = this.inputFromParent;
  }

  productBuilder = new FormBuilder().group({
    product_id: [''  , emptyValidator()],
    description:['', emptyValidator()],
    name: ['', emptyValidator()],
    quantity: ['', emptyValidator()],
    retail_price:['', emptyValidator()],
    wholesale_price:['', emptyValidator()]

  })

  update(){
    const detail: detailProduct = {
      product_id : this.productBuilder.getRawValue().product_id ? this.productBuilder.getRawValue().product_id:this.inputFromParent?.product_id,
      description : this.productBuilder.getRawValue().description ? this.productBuilder.getRawValue().description:this.inputFromParent?.description,
      name : this.productBuilder.getRawValue().name ? this.productBuilder.getRawValue().name:this.inputFromParent?.name,
      quantity : this.productBuilder.getRawValue().quantity ? this.productBuilder.getRawValue().quantity:this.inputFromParent?.quantity,
      retail_price : this.productBuilder.getRawValue().retail_price ? this.productBuilder.getRawValue().retail_price:this.inputFromParent?.retail_price,
      wholesale_price : this.productBuilder.getRawValue().wholesale_price ? this.productBuilder.getRawValue().wholesale_price:this.inputFromParent?.wholesale_price

    }

    this.productService.UpdateProduct(detail, detail.product_id).subscribe(data =>{
      console.log(data);
      if(data["success"] == true){
        alert(data["message"]);
        this.cd.detectChanges();
        this.router.navigate(['/products']);
      }else{
        alert(data["message"]);
      }
    })

  }

  productBuilder_1 = new FormBuilder().group({
    description:['', emptyValidator()],
    name: ['', emptyValidator()],
    quantity: ['', emptyValidator()],
    retail_price:['', emptyValidator()],
    wholesale_price:['', emptyValidator()]

  })

  add(){
    const detail: inputProduct = {
      description : this.productBuilder_1.getRawValue().description ,
      name : this.productBuilder_1.getRawValue().name,
      quantity : this.productBuilder_1.getRawValue().quantity,
      retail_price : this.productBuilder_1.getRawValue().retail_price,
      wholesale_price : this.productBuilder_1.getRawValue().wholesale_price 

    }
    
    this.productService.AddNewProduct(detail).subscribe(data =>{
      console.log(data);
      if(data["success"] == true){
        this.router.navigate(['/products']);
      }else{
        alert(data["message"]);
      }
    })
  }
}
interface detailProduct{
  product_id:BigInt | any,
  description: string| any,
  name: string| any,
  quantity: number| any,
  retail_price: number| any,
  wholesale_price: number| any
}

interface inputProduct{
  description: string| any,
  name: string| any,
  quantity: number| any,
  retail_price: number| any,
  wholesale_price: number| any
}

