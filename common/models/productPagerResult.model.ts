import { Products } from "./product.model";
import { ProductImages } from "./productImage.model";

export interface ProductPagerResult{
    Products : Products;
    ProductImages : ProductImages[];    
}