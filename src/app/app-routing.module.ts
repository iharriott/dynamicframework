import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDefinitionComponent } from './custom-components/product-definition/product-definition.component';

const routes: Routes = [
  {path: 'product', component: ProductDefinitionComponent, data:{view: "product"}},
  {path: 'people', component: ProductDefinitionComponent, data:{view: "people"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
