import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  binding: any;
  addRecipeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    prepTime: new FormControl(0, [
      Validators.required, 
      Validators.min(0)
    ]),
  });

  onSubmit() {
    if(this.addRecipeForm.valid) {
      console.log(this.addRecipeForm.value);
    } else {
      console.error("Form is not valid");
    }
  }
}
