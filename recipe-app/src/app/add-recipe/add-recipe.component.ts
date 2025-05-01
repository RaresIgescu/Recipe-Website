import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../interfaces/recipe.interface';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  localStorageValue: string | null = ' ';

  constructor(readonly recipeService: RecipesService) {

  }

  binding: any;
  addRecipeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    difficulty: new FormControl('', [
      Validators.required, 
      Validators.min(0)
    ]),
    image: new FormControl('', [
      Validators.required, 
      Validators.min(0)
    ]),
    prepTimeMinutes: new FormControl(0, [
      Validators.required, 
      Validators.min(0)
    ]),
  });

  onSubmit() {
    if(this.addRecipeForm.valid) {
      this.recipeService.addDbRecipes(this.addRecipeForm.value as Omit<Recipe, 'id'>
      );
    }
  }
}
