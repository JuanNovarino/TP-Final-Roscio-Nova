import { Component, inject, OnInit, viewChild, input } from '@angular/core';
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
