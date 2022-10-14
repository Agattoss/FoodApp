import { Action, createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions from '../store/recipe.actions'

export interface State {
recipes: Recipe [],
}

const initialState: State = {
  recipes: [],
}

const _recipeReducer = createReducer(
  initialState,
  on( RecipeActions.addRecipe,
    (state, action)=>(
      {...state,
        recipes: state.recipes.concat({ ...action.recipe })}
    )

  ),
  on (RecipeActions.updateRecipe,
    (state, action)=> ({
      ...state,
      recipes: state.recipes.map(
        (recipe, index) => index === action.index ? { ...action.recipe } : recipe
      )
    })
    ),

    on (RecipeActions.deleteRecipe,
      (state, action)=>({
        ...state,
        recipes: state.recipes.filter(
          (_, index) => index !== action.index)

      })),
    on (RecipeActions.setRecipes,
      (state, action)=>({
        ...state,
        recipes: [...action.recipes]

      })),
    on (RecipeActions.fetchRecipe,
      (state, action)=>({
        ...state

      })),
    on (RecipeActions.storeRecipes,
      (state, action)=>({
        ...state

      })),

)
export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}
