import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"]
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("recipeId")) {
        //redirect
      } else {
        this.recipe = this.recipesService.getRecipeById(
          paramMap["params"]["recipeId"]
        );
      }
    });
  }

  deleteRecipe() {
    this.alertController
      .create({
        header: "Are You Sure?",
        message: "Do you really want to delete the recipe?",
        buttons: [
          { text: "Cancel", role: "cancel" },
          {
            text: "Okay",
            handler: () => {
              this.recipesService.deleteRecipeById(this.recipe.id);
              // this.router.navigateByUrl("/recipes");
              this.router.navigate(["/recipes"]);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
