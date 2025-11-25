import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import path from 'path';
import { Component } from '@angular/core';
import { Home } from './pages/home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { ProductList } from './component/product-list/product-list';
import { MyProfile } from './components/my-profile/my-profile';
import { EditUser } from './components/edit-user/edit-user';
import { Menu } from './pages/menu/menu';
import { Myrestaurant } from './components/myrestaurant/myrestaurant';
import { NewEditCategory } from './components/new-edit-category/new-edit-category';
import { LoggedProductDetails } from './components/logged-product-details/logged-product-details';
import { ProductDetails } from './pages/product-details/product-details';
import { NewEditProduct } from './components/new-edit-product/new-edit-product';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
      path: "menu/:idUser",
      component: Menu,
    },
    {
      path: "menu/:idUser/product/:IdProduct",
      component: ProductDetails,
    },
 
    {
      path: "login",
      component : LoginPage,
    },
    {
      path : "register",
      component : RegisterPage,
    },
    

    {
      path: "admin",
      component: AdminLayout,
      
       children: [
           
            { path: "", redirectTo: "myrestaurant", pathMatch: "full" }, 

            {
              path: "myprofile",
              component : MyProfile,
            },
            {
              path: "myrestaurant",
              component: Myrestaurant,
            },

            
            {
              path: "myrestaurant/new",
              component: NewEditCategory,
            },

            {
              path: "myrestaurant/:idCategory/edit",
              component: NewEditCategory,
            },

            {
              path: "myrestaurant/:idCategory/newproduct",
              component: NewEditProduct,
            },

            {
              path: "myrestaurant/:idProduct/productedit",
              component : NewEditProduct,
            },

            {
              path: "myprofile/:idUser/edit",
              component: EditUser,
            },
            {
              path: "myrestaurant/:IdProduct",
              component: LoggedProductDetails,
            },

            
                        

           
        ]
  },

  
];


