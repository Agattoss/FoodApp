import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Cheese", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg", [
      new Ingredient('Ser', 1),
      new Ingredient("super ser", 2)
    ]),


    new Recipe("More Cheese", "Another test recipe.", "https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikicheese_-_Brie_de_Melun_-_20150515_-_015.jpg",
    [
      new Ingredient("Serowy Ser",1),
      new Ingredient("Bardziej Srerowy Ser", 2)
    ])
  ];
  constructor(private slService : ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }
  
  
  addIngredientsToShoppingList(ingredients:Ingredient[] ){
    this.slService.addIngredients(ingredients);
    
  }
  
}
