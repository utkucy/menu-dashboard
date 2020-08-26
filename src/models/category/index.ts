import { observer } from "mobx-react";
import { observable, action } from 'mobx';
import { BaseProduct, Product, PartialProduct } from "models/product";

export class BaseCategory {
  id?: string
  name?: string
  description?: string
  products?: BaseProduct[] | null
}

export class Category extends BaseCategory {
  products?: Product[] | null

  constructor(data: BaseCategory = {}) {
    super()
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.products = data.products?.map((p) => new Product(p))
  }
}

export class PartialCategory extends Category {
  @observable name?: string
  @observable description?: string
  @observable products?: PartialProduct[] | null

  constructor(data: BaseCategory = {}) {
    super(data)
    this.products = data.products?.map((product) => new PartialProduct(product))
  }

  set toUndefined(u: undefined) {
    this.name = u
    this.description = u
    this.products = u

  }

  @action.bound
  filterList(product: PartialProduct) {
    this.products = this.products?.filter(p => p !== product)
  }
}