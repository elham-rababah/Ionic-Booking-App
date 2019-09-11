import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  constructor() {}
  recipes: Recipe[] = [
    {
      id: "1",
      title: "Shrimp Tacos with Avocado Crema",
      imageUrl:
        "http://images.media-allrecipes.com/userphotos/960x960/5120549.jpg",
      ingredients: ["Shrimp", "Avocado", "Crema"]
    },
    {
      id: "2",
      title: "Cabbage Roll Chicken Enchiladas",
      imageUrl:
        "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      ingredients: ["Cabbage", "Chicken"]
    },
    {
      id: "3",
      title: "One-Pot Pasta with Tuna",
      imageUrl:
        "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26232321/5050780.jpg",
      ingredients: ["Pasta", "Tuna"]
    }
  ];

  getAllRecipes() {
    return [...this.recipes];
  }
  getRecipeById(id) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id == id;
      })
    };
  }
}
