
import axios from 'axios';

import { Product } from 'models/product';
import { Category } from 'models/category';



export default class ProductService {

  static async newProduct(product: Product, category: Category) {
    try {
      const res = await axios.post(`http://localhost:5000/api/product/new-product/${category.id}`, {product})
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(product: Product) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/product/${product.id}`, {product})
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteProduct(product: Product) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/product/${product.id}`)
    } catch (error) {
      console.log(error);
    }
  }


}