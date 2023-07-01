import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full'},
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: SubCategoryComponent },
  { path: "**", component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  CategoryComponent,
  SubCategoryComponent,
  PageNotFoundComponent
]