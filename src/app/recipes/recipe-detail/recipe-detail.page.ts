import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { ActivatedRoute, Router } from "@angular/router";

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
    private router: Router
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
    this.recipesService.deleteRecipeById(this.recipe.id);
    // this.router.navigateByUrl("/recipes");
    this.router.navigate(["/recipes"]);
  }
}
