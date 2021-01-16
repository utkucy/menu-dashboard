
import { observable, computed } from "mobx";

import { BaseBranch, Branch, PartialBranch } from 'models/branch'

export class BaseUser {
  id?: string
  email?: string
  password?: string
  restaurant_name?: string
  phone_number?: string
  website?: string
  trial?: boolean
  image_url?: string
  branches?: BaseBranch[] | null

}

export class User extends BaseUser {

  @observable index = 0

  constructor(data: BaseUser = {}) {
    super()
    this.id = data.id
    this.email = data.email
    this.password = data.password
    this.restaurant_name = data.restaurant_name
    this.phone_number = data.phone_number
    this.website = data.website
    this.trial = data.trial
    this.image_url = data.image_url
    this.branches = data.branches?.map((p) => new Branch(p))
  }

  set selectedIndex(index: number) {
    this.index = index
  }

  get selectedIndex() {
    return this.index
  }

  @computed
  get selectedBranch() {
    this.branches?.map((branch, index) => { 
      if (index === this.index) 
        return branch
    })
    return undefined
  }

}

export class PartialUser extends User {
  @observable id?: string
  @observable email?: string
  @observable password?: string
  @observable restaurant_name?: string
  @observable phone_number?: string
  @observable website?: string
  @observable trial?: boolean
  @observable image_url?: string
  @observable branches?: PartialBranch[] | null

 
  constructor(data: BaseUser = {}) {
    super(data)
    this.branches = data.branches?.map((branch) => new PartialBranch(branch))
  }
}