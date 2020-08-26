import { observable, action, computed, toJS } from 'mobx'
import axios from 'axios';

import { User } from 'models/user'



class SignUpStore {

  @observable signup_status = false


  
  async signup(user: User) {

    try {
      const res = await axios.post("http://localhost:5000/api/user", user)
      console.log(res)
      console.log(res.data)
      this.signup_status = true
    }
    catch(error) {
      console.log(error)
      this.signup_status = false
    }
  }

}




const store = new SignUpStore()
export default store