
import { observable } from "mobx";
import { Menu, BaseMenu, PartialMenu } from "models/menu";

export class BaseBranch {
  id?: string
  name?: string
  address?: string
  telephone?: string
  menu?: BaseMenu
}

export class Branch extends BaseBranch {

  constructor(data: BaseBranch = {}) {
    super()
    this.id = data.id
    this.name = data.name
    this.address = data.address
    this.telephone = data.telephone
    this.menu = new Menu(data.menu)
  }
}

export class PartialBranch extends Branch {
  @observable name?: string
  @observable address?: string
  @observable telephone?: string
  @observable menu?: PartialMenu
}