import { Component, OnInit} from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(){}

  list:Array<any> = [];
  // page:Number = 0;

  ngOnInit(): void {
    axios.get('http://localhost:8080/products').then(res =>{
    console.log(res.data.data);
    this.list = res.data.data
    // let list:Array<any> = res.data.data;
    // for(let index = 0; index < list.length; index++){
    //   this.list.push(list.slice(index, 10))
    //   index += 9;
    // }

    })
  }
}