import { Component, OnInit } from '@angular/core';
import { userService } from '../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyValidator } from '../empty.validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.css'
})
export class ResgisterComponent implements OnInit{


  constructor(private userService:userService, private router: Router){

  }

  ngOnInit(): void {
    
  }

  fBuilder = new FormBuilder().group({
    username: ['', emptyValidator()],
    email:['', emptyValidator()],
    password: ['', emptyValidator()],

  })

  onClick() {
    console.log(this.fBuilder.getRawValue());
    const user: UserRegiser = {
      username : this.fBuilder.getRawValue().username,
      email : this.fBuilder.getRawValue().email,
      password : this.fBuilder.getRawValue().password

    }

    this.userService.Login(user).subscribe(data =>{
      console.log(data);
      if(data["success"] == true){
        this.router.navigate(['/login']);
      }else{
        alert(data["message"]);
      }
    })

  }

}


interface UserRegiser{
  username:any;
  email:any;
  password:any;
  
}
