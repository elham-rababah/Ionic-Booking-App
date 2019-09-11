import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"]
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];
  // = [
  //   {
  //     id: "1",
  //     title: "Shrimp Tacos with Avocado Crema",
  //     imageUrl:
  //       "http://images.media-allrecipes.com/userphotos/960x960/5120549.jpg",
  //     ingredients: "ingredients"
  //   },
  //   {
  //     id: "2",
  //     title: "Cabbage Roll Chicken Enchiladas",
  //     imageUrl:
  //       "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
  //     ingredients:
  //       "These healthy dinner recipes utilize convenience items like pre-cooked chicken, frozen vegetables and other pantry items for a meal that comes together in under an hour with just 5 ingredients."
  //   },
  //   {
  //     id: "3",
  //     title: "One-Pot Pasta with Tuna",
  //     imageUrl:
  //       "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26232321/5050780.jpg",
  //     ingredients:
  //       "Use the one-pot pasta cooking method to make this tuna pasta recipe that calls for just 5 ingredients and is ready in just over half an hour. For extra crunch and a tuna noodle casserole feel, sprinkle this speedy pasta dish with toasted whole-wheat panko breadcrumbs."
  //   }
  // ];

  constructor(private recipesService: RecipesService) {
    this.recipes = this.recipesService.getAllRecipes();
  }

  ngOnInit() {}
}
