import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../empty.validator';
import { ReactiveFormsModule }   from '@angular/forms';
import { userService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private userService:userService, private router: Router) { }


  ngOnInit() {
  }

  fBuilder = new FormBuilder().group({
    username: ['', emptyValidator()],
    password: ['', emptyValidator()],

  })

  onClick() {
    console.log(this.fBuilder.getRawValue());
    const user: UserLogin = {
      username : this.fBuilder.getRawValue().username,
      password : this.fBuilder.getRawValue().password

    }

    this.userService.Login(user).subscribe(data =>{
      console.log("in login")
      if(data["success"] == true){
        localStorage.setItem('token', JSON.stringify({ token: data["token"] }));
        this.router.navigate(['/products'])
      }else{
        alert(data["message"]);
      }
    })

  }
  

}

interface UserLogin {
  username: any;
  password: any;
}

