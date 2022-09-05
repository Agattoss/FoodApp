import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model"

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Ser", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg"),
    new Recipe("Ser", "Test recipe.", "https://upload.wikimedia.org/wikipedia/commons/6/61/Trappista_cheese_original.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
