import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  authService = inject(AuthService)
  categories : Record<number,Category[]> = {}
  readonly URL_BASE ="https://w370351.ferozo.com/api/categories";
  
    

  

  async getCategoriesByUserId(userId : number){ 
          const res = await fetch(`https://w370351.ferozo.com/api/users/${userId}/categories`, {
               headers: {
                  Authorization: "Bearer " + this.authService.getToken(),
              },
          });
          if (!res.ok) return undefined;
          const resProducts: Category[] = await res.json();
        
          this.categories[userId] = resProducts //actualizar el record con las categorias geteadas
          return resProducts
    }

      async createCategory(newcategory : NewCategory) { //asignar id ?? 
            const res = await fetch(this.URL_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: "Bearer " + this.authService.getToken(),
                },
                body: JSON.stringify(newcategory)
            });
            if (!res.ok) return undefined;
            const createdCategory: Category = await res.json();

            const currentUserId = this.authService.getUserId();

            if(currentUserId !== undefined){
                if(this.categories[currentUserId]){
                  
                  this.categories[currentUserId].push(createdCategory); //si ya tiene categorias, le suma la nueva
                } else {
                  this.categories[currentUserId] = [createdCategory]; // sino tiene ninguna y es la primera la crea 
                }
            }
            return createdCategory;
      }

       async deleteCategory(id: number) {
        const res = await fetch(this.URL_BASE + "/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + this.authService.getToken(),
            },
        });
        if (!res.ok) return false;

         const currentUserId = this.authService.getUserId()!;

         if(currentUserId!==undefined && this.categories[currentUserId]){

          this.categories[currentUserId!] = this.categories[currentUserId].filter(category => category.id != id);
         }
        return true;
        
  }

  async editCategory(categoryEdit: Category) {
          const res = await fetch(this.URL_BASE + "/" + categoryEdit.id, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.authService.getToken(),
              },
              body: JSON.stringify(categoryEdit)
          });
          if (!res.ok) return undefined;
          const editedCategory: Category = await res.json();

           const currentUserId = this.authService.getUserId(); 

            if(currentUserId!==undefined && this.categories[currentUserId]){

          this.categories[currentUserId] = this.categories[currentUserId].map(
            category => {
              if (category.id == editedCategory.id) { // Usamos == para seguridad de tipos
                        return editedCategory; 
                    }
                    return category;
             } 
           );
         }
          
          return editedCategory;
    }
  
}
