
import axios from 'axios';
import { Cookies } from "react-cookie";
import  Router from 'next/router';
import { message } from 'antd';

import { User } from 'models/user'
import { Branch } from 'models/branch';



export default class UserService {

  static async login(email: string, password: string) {
    try {
      const res = await axios.get(`http://localhost:5000/api/login/${email}/${password}`)
      console.log(res.data)
      
      const cookies = new Cookies()
      cookies.set("userId", res.data.id)
      cookies.set("selectedBranchIndex", 0)
      // cookies.set("selectedBranchId", res.data.branches[0].id)
      // cookies.set("selectedMenuId", res.data.branches[0].menu.id)
      console.log(cookies)
      Router.push('/menu')
    }
    catch(error) {
      message.error('Girilen hesap bilgilerine ait bir hesap bulunamadı')
      console.log(error)
    }
  }

  static async logout() {
    const cookies = new Cookies()
    cookies.remove("userId")
    Router.replace('/')
  }
  
  static async fetchUser(userId: string) {
    try {
      const res = await axios.get(`http://localhost:5000/api/login/${userId}`)
      console.log(res.data)
      const user = new User(res.data)
      // user.branches?.forEach(branch => {
      //   console.log(branch.menu);
      // })
      // console.log(user);
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

  static async editUser(user: User) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/user/${user.id}`, user)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

}