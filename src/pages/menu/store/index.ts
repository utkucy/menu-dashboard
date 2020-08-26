import { observable, action, computed, toJS } from 'mobx'
import axios from 'axios';

import { User } from 'models/user'



class MenuStore {

  @observable login_status = false
  @observable user: User | undefined


  @action
  async getBranch(email: string, password: string) {

    try {
      const res = await axios.get(`http://localhost:5000/api/user/${email}/${password}`)
      console.log(res)
      console.log(res.data)
      this.user = new User(res.data)
      this.login_status = true
    }
    catch(error) {
      console.log(error)
      this.login_status = false
    }
  }


}




const store = new MenuStore()
export default store