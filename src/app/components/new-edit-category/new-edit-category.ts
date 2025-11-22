import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category, NewCategory } from '../../interfaces/category'; 
import { CategoryService } from '../../services/category-service'; 
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-new-edit-category',
  imports: [FormsModule, RouterModule],
  templateUrl: './new-edit-category.html',
  styleUrl: './new-edit-category.scss', 
})
export class NewEditCategory implements OnInit {
   categoryService = inject(CategoryService); 
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  errorEnBack = false;
  idCategory: number | null = null; 
  
  
  form = viewChild<NgForm>('newCategoryForm');

  isSubmitting = false;

  
  
  ngOnInit() {
    
    const idCategoryString = this.route.snapshot.paramMap.get('idCategory');
    
    if(idCategoryString){
      
      this.idCategory = parseInt(idCategoryString, 10);
      
      
    }
  }

  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    this.isSubmitting = true;
    
    
    if (!form.value.name) {
      this.errorEnBack = true; 
      this.isSubmitting = false;
      return;
    }

    const categoryData: NewCategory = {
      name: form.value.name,
    };
    
    let res;

    
    if(this.idCategory){
      
      const categoryToEdit: Category = { 
        ...categoryData, 
        id: this.idCategory 
      };

      res = await this.categoryService.editCategory(categoryToEdit);
    } else {
      
      res = await this.categoryService.createCategory(categoryData);
    }

    
    this.isSubmitting = false;
    
    if(!res) {
      this.errorEnBack = true;
      return;
    };

    this.router.navigate(["/admin/myrestaurant"]); 


  }

 
}

/*categoryService = inject(CategoryService); 
  router = inject(Router);
  route = inject(ActivatedRoute);
  errorEnBack = false;
  idCategory: number | null = null; 
  categoryOriginal: Category | undefined = undefined;
  form = viewChild<NgForm>('newCategoryForm');

  isSubmitting = false;

  
   async ngOnInit() {
    
    const idCategoryString = this.route.snapshot.paramMap.get('idCategory');
    
    if(idCategoryString){
      
      this.idCategory = parseInt(idCategoryString, 10);
    }

    if(this.idCategory){
      this.categoryOriginal = await this.categoryService.get(this.idCategory);
      
        this.form()?.setValue({
          name: this.categoryOriginal?.name,
        });
    
    }
  }

  /**
   * Maneja el envío del formulario (Creación o Edición).
   
  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    this.isSubmitting = true;
    
    // Validamos que el campo 'name' tenga valor antes de continuar
    if (!form.value.name) {
      this.errorEnBack = true; 
      this.isSubmitting = false;
      return;
    }

    const categoryData: NewCategory = {
      name: form.value.name,
    };
    
    let res;

    if(this.idCategory){
      res = await this.categoryService.editCategory({...categoryData,id:this.idCategory});
    } else {
      res = await this.categoryService.createCategory(categoryData);
    }
    
    

    this.isSubmitting = false;
    
    if(!res) {
      this.errorEnBack = true;
      return;
    };

    // Redirigir al panel de administración o lista de productos/categorías.
    this.router.navigate(["/admin/myrestaurant"]); 
  }*/