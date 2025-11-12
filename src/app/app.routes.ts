import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import path from 'path';
import { Component } from '@angular/core';
import { Home } from './pages/home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { ProductList } from './component/product-list/product-list';
import { MyProfile } from './components/my-profile/my-profile';

export const routes: Routes = [
    {
        path: "",
        component: Home,
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
           
            { path: "", redirectTo: "productos", pathMatch: "full" }, 
            
            { path: "productos", component: ProductList }, 

            {
              path: "myprofile",
              component : MyProfile
            },

            {
              path: "myprofile/"
            }
                        
            //{ path: "categorias", component: CategoryListComponent },

           
        ]
  },

  
];


