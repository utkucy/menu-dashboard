import axios from 'axios'

import { Category } from 'models/category';
import { Product } from 'models/product';


export default class CategoryService {

  static async newCategory(menuId: string, category: Category) {
    const products = category.products?.map(product => new Product(product))
    const name = category.name
    const description = category.description
    try {
      const res = await axios.post(`http://localhost:5000/api/category/${menuId}`, { 
        name,
        description
      })
      const product_res = await axios.post(`http://localhost:5000/api/product/add-to-category/${res.data.id}`, {products})
    } catch (error) {
      console.log(error)
    }
  }

}