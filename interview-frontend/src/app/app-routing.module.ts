import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryFormComponent } from './country-form/country-form.component';
const routes: Routes = [{ path: '', component: CountryFormComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
