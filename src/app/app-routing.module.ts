import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectDateTimeComponent } from './select-date-time/select-date-time.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { SummaryComponent } from './summary/summary.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full'},
  { path: 'category', component: CategoryComponent },
  { path: 'category/:mainId', component: SubCategoryComponent },
  { path: 'category/:mainId/:subId/select-date', component: SelectDateTimeComponent },
  { path: 'category/:mainId/:subId/details-form', component: DetailsFormComponent },
  { path: 'category/:mainId/:subId/summary', component: SummaryComponent },
  { path: 'receipt', component: ReceiptComponent},
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
  SelectDateTimeComponent,
  DetailsFormComponent,
  SummaryComponent,
  ReceiptComponent,
  PageNotFoundComponent
]
