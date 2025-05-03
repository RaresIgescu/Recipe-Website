import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesService } from '../services/recipes.service';
import { db } from '../db/db';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-page',
  imports: [CommonModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  recipeId!: string;
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.recipe = this.recipesService.getRecipeById(this.recipeId);
  }

  readonly router = inject(ActivatedRoute);
  
}
