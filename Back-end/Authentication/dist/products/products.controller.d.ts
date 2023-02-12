import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodtitle: string, prodDdesc: string, prodPrice: number): any;
    getAllProducts(): import("./products.model").Product[];
    getProduct(prodId: string): {
        id: string;
        title: string;
        desc: string;
        price: number;
    };
    updateProduct(prodId: string, prodTitle: string, prodDdesc: string, prodPrice: number): any;
    removeProduct(prodId: string): any;
}
