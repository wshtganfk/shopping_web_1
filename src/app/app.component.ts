import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router:Router,
    private cd: ChangeDetectorRef
    ){}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.loginStatus = true;
    }else{
      this.loginStatus = false;
    }
  }
  title = 'shopping_web_1';
  loginStatus: boolean | undefined ;

  onClick(){
    const token = localStorage.getItem('token');
    if(token){
      alert("successful logout")
      localStorage.removeItem('token');
      this.loginStatus = false;
      this.router.navigate(["/login"])
    }
  }
  onLogin(){
    this.cd.detectChanges();
  }

}
