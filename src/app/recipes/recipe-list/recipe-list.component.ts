import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Recipe} from "../recipe.model"

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Cheese", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg"),
    new Recipe("More Cheese", "Another test recipe.", "https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikicheese_-_Brie_de_Melun_-_20150515_-_015.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);

  }

}
