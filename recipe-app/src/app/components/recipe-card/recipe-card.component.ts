import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(readonly router: Router){}

  goToRecipePage() {
    this.router.navigateByUrl('recipes/' + this.recipe.id)
  }
}


