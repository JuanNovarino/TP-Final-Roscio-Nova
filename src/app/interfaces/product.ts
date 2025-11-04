export interface Product {

    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    featured: boolean; 
    hasHappyHour: boolean; 
    discount: number; 
    labels: string[]; 
    recommendedFor: number
}

export type NewProduct = Omit<Product, 'id'>;