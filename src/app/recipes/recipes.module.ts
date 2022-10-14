
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import * as fromRecipes from './store/recipe.reducer';

@NgModule({
    declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ],

    imports: [
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        RecipesRoutingModule,
        CommonModule,
        StoreModule.forFeature('recipes', fromRecipes.recipeReducer),
    ]
})
export class RecipesModule {

}
