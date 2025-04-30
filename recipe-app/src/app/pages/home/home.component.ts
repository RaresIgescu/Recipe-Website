import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../interfaces/recipe.interface';
import { RecipesService } from '../../services/recipes.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { db } from '../../db/db';

@Component({
  selector: 'app-home',
  imports: [RecipeCardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  recipes: any[];
  dummyRecipes!: Recipe[];
  errorMessage: any = ' ';
  searchValue: any = ' ';
  filteredRecipes!: any[]; //semnul exclamarii il folosim pentru a putea folosi vectorul fara valoare declarata implicit
  dbRecipes!: any[];

  constructor(recipesService: RecipesService, readonly router: Router) {
    this.recipes = recipesService.recipes;
    try {
      recipesService.getAllRecipes().subscribe({
        next: (response) => {
          console.log(response);
          this.dummyRecipes = response.recipes;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      }); 
    } catch (error) {
      this.errorMessage = error;
    }

    db.subscribeQuery({ recipes: {} }, (resp) => {
          if (resp.error) {
            this.errorMessage = resp.error; 
          }
          if (resp.data) {
            this.dbRecipes = resp.data.recipes;
            this.filteredRecipes = resp.data.recipes;
          }
        });

  }
  //   setInterval(() => {
  //   db.subscribeQuery({ recipes: {} }, (resp) => {
  //     if (resp.error) {
  //       this.errorMessage = resp.error; 
  //     }
  //     if (resp.data) {
  //       this.dbRecipes = resp.data.recipes;
  //       this.filteredRecipes = resp.data.recipes;
  //     }
  //   });
  // }, 5000);
  // }

  filterValues() {
    this.filteredRecipes = this.dbRecipes.filter((recipe) => 
      recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())
    );
  }

  redirectToAddRecipe() {
    this.router.navigateByUrl('/add-recipe');
  }
}
