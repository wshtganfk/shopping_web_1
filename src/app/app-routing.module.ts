import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';
import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:ResgisterComponent},
  {path:"products", component:ProductsComponent},
  {path:"orders", component:OrderComponent},
  {path:"watchlist", component:WatchlistComponent},


  {path:"", redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes), 
    ReactiveFormsModule ],
  exports: [RouterModule ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
   
    multi:true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService,
    


]
})
export class AppRoutingModule { }
