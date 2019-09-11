import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"]
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
    {
      id: "1",
      title: "Shrimp Tacos with Avocado Crema",
      imageUrl:
        "http://images.media-allrecipes.com/userphotos/960x960/5120549.jpg",
      ingredients: "ingredients"
    },
    {
      id: "2",
      title: "Shrimp Tacos with Avocado Crema",
      imageUrl:
        "http://images.media-allrecipes.com/userphotos/960x960/5120549.jpg",
      ingredients: "ingredients"
    },
    {
      id: "2",
      title: "Shrimp Tacos with Avocado Crema",
      imageUrl:
        "http://images.media-allrecipes.com/userphotos/960x960/5120549.jpg",
      ingredients: "ingredients"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
