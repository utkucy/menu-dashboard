
import { observable } from "mobx";

export class BaseProduct {
  id?: string
  name?: string
  description?: string
  price?: string
  imageURL?: string
}

export class Product extends BaseProduct {

  constructor(data: BaseProduct = {}) {
    super()
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.price = data.price
    this.imageURL = data.imageURL
  }
}

export class PartialProduct extends Product {
  @observable name?: string
  @observable description?: string
  @observable price?: string
  @observable imageURL?: string

  constructor(data: BaseProduct = {}) {
    super(data)
    this.name = data.name
    this.description = data.description
    this.price = data.price
    this.imageURL = data.imageURL
  }

  set updateProduct(product: PartialProduct) {
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.imageURL = product.imageURL
  }
}