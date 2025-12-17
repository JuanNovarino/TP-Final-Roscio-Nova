import { Component, inject, viewChild, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { NewProduct } from '../../interfaces/product';
@Component({
  selector: 'app-new-edit-product',
  imports: [FormsModule,RouterModule],
  templateUrl: './new-edit-product.html',
  styleUrl: './new-edit-product.scss',
})
export class NewEditProduct {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  idCategoryRoute: number | null = null; 
  
  errorEnBack = false;
  isSubmitting = false;
  isLoading = true; 

  idProduct: number | null = null;
  productOriginal: Product | undefined = undefined; 

  availableCategories: Category[] | undefined;
  
   async ngOnInit() {
     const idProductString = this.route.snapshot.paramMap.get('idProduct');
    this.isLoading = true;
    
    
    if (idProductString) {
      this.idProduct = parseInt(idProductString, 10);
    }
    
    
    const idCategoryString = this.route.snapshot.paramMap.get('idCategory');
    if (idCategoryString) {
        this.idCategoryRoute = parseInt(idCategoryString, 10);
    }

    
    if (this.idProduct) {
        this.productOriginal = await this.productService.getProductById(this.idProduct);
        
        if (this.productOriginal) {
            this.selectedLabels = this.productOriginal.labels || [];
            
            
            setTimeout(() => {
                this.form()?.setValue({
                    name: this.productOriginal?.name,
                    description: this.productOriginal?.description,
                    price: this.productOriginal?.price,
                    featured: this.productOriginal?.featured,
                    hasHappyHour: this.productOriginal?.hasHappyHour,
                    discount: this.productOriginal?.discount,
                    recommendedFor: this.productOriginal?.recommendedFor,
                });
            });
          
            this.idCategoryRoute = this.productOriginal.categoryId; 
        }
    } else if (!this.idCategoryRoute) {
        alert('Error: Debe especificar una categoría para crear un producto.');
        this.router.navigate(["/admin/productos"]);
    }
    
    this.isLoading = false;
  }
    
  availableLabels: string[] = [
    "Vegan", "Vegetarian", "GlutenFree", "Spicy", "SugarFree", "Kids", "Shareable",
  ];
  selectedLabels: string[] = []; 

  
  form = viewChild<NgForm>('newProductForm');


    hasLabel(label: string): boolean {
    return this.selectedLabels.includes(label);
  }

 
   
  onLabelChange(event: Event, label: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      if (!this.selectedLabels.includes(label)) {
        this.selectedLabels.push(label);
      }
    } else {
      this.selectedLabels = this.selectedLabels.filter(l => l !== label);
    }
  }
  
  

  async handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    this.isSubmitting = true;
    
    
    const productData: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: this.idCategoryRoute!,
      featured: form.value.featured || false,
      hasHappyHour: form.value.hasHappyHour || false,
      discount: form.value.discount || 0,
      labels: this.selectedLabels, 
      recommendedFor: form.value.recommendedFor || 1, 
    };

    let res;
    
    if (this.idProduct) {
    
      const productToEdit: Product = { ...productData, id: this.idProduct };
      res = await this.productService.editProduct(productToEdit);
    } else {
      
      res = await this.productService.createProduct(productData);
    }

    this.isSubmitting = false;
    
    if (!res) {
      this.errorEnBack = true;
      return;
    }

    
    this.router.navigate(["/admin/myrestaurant"]);
  }


}
