import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category, NewCategory } from '../../interfaces/category'; 
import { CategoryService } from '../../services/category-service'; 
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

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

  errorEnBack = false;
  idCategory: number | null = null; 
  

  form = viewChild<NgForm>('newCategoryForm');

  isSubmitting = false;

  
  ngOnInit() {
    // Obtener el ID de la categoría desde los parámetros de la ruta
    const idCategoryString = this.route.snapshot.paramMap.get('idCategory');
    
    if(idCategoryString){
      // Convertir el ID de la categoría a número
      this.idCategory = parseInt(idCategoryString, 10);
      
      // En modo edición, el formulario se carga vacío y el usuario debe reingresar el nombre.
    }
  }

  /**
   * Maneja el envío del formulario (Creación o Edición).
   */
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

    res = await this.categoryService.createCategory(categoryData);
    

    this.isSubmitting = false;
    
    if(!res) {
      this.errorEnBack = true;
      return;
    };

    // Redirigir al panel de administración o lista de productos/categorías.
    this.router.navigate(["/admin/myrestaurant"]); 
  }
}
