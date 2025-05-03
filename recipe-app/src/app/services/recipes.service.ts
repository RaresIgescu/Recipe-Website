import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { db } from '../db/db';
import { id } from '@instantdb/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  recipes!: any[];
  readonly API_URL = 'https://dummyjson.com/recipes';
  readonly SYNC_KEY = 'recipe_sync';

  constructor(readonly http: HttpClient) {
  }

  getAllRecipes() {
    return this.http.get<{recipes: Recipe[]}>(this.API_URL);
  }
  
  getRecipeById(id: string): Promise<Recipe> {
    try {
      // Folosim o promisiune pentru a transforma callback-ul subscribeQuery
      const recipe = new Promise<Recipe>((resolve, reject) => {
        const unsubscribe = db.subscribeQuery(
          {
            recipes: {
              where: { id }
            }
          },
          (resp) => {
            if (resp.error) {
              reject(resp.error);
              return;
            }
            
            const recipe = resp.data?.recipes?.[0];
            resolve(recipe);
            
            // Dezabonare după primul răspuns dacă vrei doar o singură încărcare
            unsubscribe();
          }
        );
      });
      
      return recipe;
    } catch (error) {
      console.error('Eroare la obținerea rețetei:', error);
      throw error;
    }
  }
  
  getRecipe(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addDbRecipes(recipeInput: Omit<Recipe, 'id'>) {
    db.transact(
      db.tx.recipes[id()].update({
        name: recipeInput.name,
        image: recipeInput.image,
        difficulty: recipeInput.difficulty,
        prepTimeMinutes: recipeInput.prepTimeMinutes,
      })
    )//.then(() => {
    //   localStorage.setItem(this.SYNC_KEY, Date.now().toString());
    // });
  }

  // subscribeToSyncEvents(callback: () => void): void {
  //   window.addEventListener('storage', (event) => {
  //     if (event.key === this.SYNC_KEY && event.newValue) {
  //       callback(); 
  //     }
  //   });
  // }
}
