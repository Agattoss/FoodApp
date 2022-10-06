import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer'


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged= new Subject<Recipe[]>();

  private recipes: Recipe[] = [
   /*  new Recipe("Cheese", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg", [
      new Ingredient('Ser', 1),
      new Ingredient("super ser", 2)
    ]),


    new Recipe("More Cheese", "Another test recipe.", "https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikicheese_-_Brie_de_Melun_-_20150515_-_015.jpg",
    [
      new Ingredient("Serowy Ser",1),
      new Ingredient("Bardziej Srerowy Ser", 2)
    ]) */
  ];
  constructor
  (private slService : ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index];

  }


  addIngredientsToShoppingList(ingredients:Ingredient[] ){
    /* this.slService.addIngredients(ingredients); */
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients) )

  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
   ;
  }
   updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
   }
   deleteRecipe (index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
   }

}
