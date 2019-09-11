import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RecipesPage } from "./recipes.page";
import { RecipesItemComponent } from "./recipes-item/recipes-item.component";

const routes: Routes = [
  {
    path: "",
    component: RecipesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [RecipesItemComponent, RecipesPage]
})
export class RecipesPageModule {}
