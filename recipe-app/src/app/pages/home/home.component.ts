import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../interfaces/recipe.interface';
import { RecipesService } from '../../services/recipes.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { db } from '../../db/db';
import { Observable, interval, Subscription, switchMap, startWith, catchError, of } from 'rxjs';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [RecipeCardComponent, FormsModule, FloatLabelModule, InputTextModule, IftaLabelModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  recipes: any[];
  dummyRecipes!: Recipe[];
  errorMessage: any = ' ';
  searchValue: any = '';
  filteredRecipes!: any[]; //semnul exclamarii il folosim pentru a putea folosi vectorul fara valoare declarata implicit
  dbRecipes!: any[];
  refreshSubscription!: Subscription;

  constructor(private recipesService: RecipesService, readonly router: Router) {
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
  
  // ngOnInit() {
  //   setInterval(() => {
  //     db.subscribeQuery({ recipes: {} }, (resp) => {
  //       if (resp.error) {
  //         this.errorMessage = resp.error; 
  //       }
  //       if (resp.data) {
  //         this.dbRecipes = resp.data.recipes;
  //         this.filteredRecipes = resp.data.recipes;
  //       }
  //     });
  //   }, 5000);
  // }
  

  // ngOnInit() {
  //   this.loadRecipes();
  //   this.recipesService.subscribeToSyncEvents(() => {
  //     this.loadRecipes(); 
  //   });
  // }

  ngOnInit() {
    this.refreshSubscription = interval(1000).pipe(
      startWith(0), 
      switchMap(() => this.fetchRecipesFromDB())
    ).subscribe();
  }

  // ngOnDestroy() {
  //   window.removeEventListener('storage', this.loadRecipes);
  // }

  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }

  filterValues() {
    this.filteredRecipes = this.dbRecipes.filter((recipe) => 
      recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())
    );
  }

  redirectToAddRecipe() {
    this.router.navigateByUrl('/add-recipe');
  }

  loadRecipes() {
    db.subscribeQuery({ recipes: {} }, (resp) => {
      if (resp.data) {
        this.recipes = resp.data.recipes;
      }
    });
  }

  fetchRecipesFromDB(): Observable<any> {
    return new Observable(observer => {
      db.subscribeQuery({ recipes: {} }, (resp) => {
        if (resp.error) {
          this.errorMessage = resp.error;
          observer.error(resp.error);
        }
        if (resp.data) {
          this.dbRecipes = resp.data.recipes;
          observer.next(resp.data);
        }
        observer.complete(); 
      });
    }).pipe(
      catchError(error => {
        console.error('Eroare la actualizare:', error);
        return of(null);
      })
    );
  }
}
