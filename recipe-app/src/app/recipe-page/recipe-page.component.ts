import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesService } from '../services/recipes.service';
import { db } from '../db/db';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-recipe-page',
  imports: [CommonModule, ButtonModule, FooterComponent],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  recipeId!: string;
  recipeChosen?: Recipe;
  recipes!: Recipe[];
  errorMessage: any = ' ';

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, readonly router: Router) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
  
    setInterval(() => {
      db.subscribeQuery({ recipes: {} }, (resp) => {
        if (resp.error) {
          this.errorMessage = resp.error;
        }
    
        if (resp.data) {
          this.recipes = resp.data.recipes;
    
          this.recipeChosen = this.recipes.find(r => r.id === this.recipeId);
        }
      });
    }, 100)
  }

  backToCatalogue() {
    this.router.navigateByUrl('/recipes');
  }
}
