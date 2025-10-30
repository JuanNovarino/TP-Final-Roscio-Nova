import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import path from 'path';
import { Component } from '@angular/core';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
      path: "login",
      component : LoginPage,
    },
];


