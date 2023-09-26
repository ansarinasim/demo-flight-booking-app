import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SuccessComponent } from './components/success/success.component';
const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:"full"},
  { path:"home", component: HomeComponent},
  { path : "booking", component : BookingComponent},
  { path : "about", component : AboutComponent},
  { path : "success" , component: SuccessComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }