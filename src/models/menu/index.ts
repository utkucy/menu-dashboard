
import { observable } from "mobx";
import { BaseCategory, Category, PartialCategory } from "models/category";

export class BaseMenu {
  id?: string
  name?: string
  description?: string
  categories?: BaseCategory[] | null
}

export class Menu extends BaseMenu {
  categories?: Category[] | null

  constructor(data: BaseMenu = {}) {
    super()
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.categories = data.categories?.map((p) => new Category(p))
  }
}

export class PartialMenu extends Menu {
  @observable name?: string
  @observable description?: string
  @observable categories?: PartialCategory[] | null

  constructor(data: BaseMenu = {}) {
    super(data)
    this.categories = data.categories?.map((category) => new PartialCategory(category))
  }
}