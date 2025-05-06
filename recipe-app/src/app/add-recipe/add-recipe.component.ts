import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../interfaces/recipe.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FooterComponent } from "../components/footer/footer.component";
import { Router } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ButtonModule, FloatLabelModule, InputTextModule, IftaLabelModule, FooterComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  localStorageValue: string | null = ' ';

  constructor(readonly recipeService: RecipesService, readonly router: Router) {

  }

  binding: any;
  addRecipeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    difficulty: new FormControl('', [
      Validators.required, 
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/\.(jpeg|jpg|png|gif|webp)$/i)
    ]),
    prepTimeMinutes: new FormControl(0, [
      Validators.required, 
      Validators.min(5)
    ]),
  });

  onSubmit() {
    if(this.addRecipeForm.valid) {
      this.recipeService.addDbRecipes(this.addRecipeForm.value as Omit<Recipe, 'id'>
      );
    }
  }

  backToCatalogue() {
    this.router.navigateByUrl('/recipes');
  }
}
