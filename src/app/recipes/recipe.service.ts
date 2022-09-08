import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Cheese", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg"),
    new Recipe("More Cheese", "Another test recipe.", "https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikicheese_-_Brie_de_Melun_-_20150515_-_015.jpg")
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
