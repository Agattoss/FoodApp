import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer'

import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  subscription: Subscription;


  constructor(
              private router: Router,
              private route: ActivatedRoute,

              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store
    .select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

      /*   this.dataStorageService.fetchRecipes().subscribe(); */ //Feching list of recipes after reload
   /*  this.recipes = this.recipeService.getRecipes(); */
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
