import axios from 'axios';
import { Cookies } from "react-cookie";
import  Router from 'next/router';
import { Branch } from 'models/branch';



export default class BranchService {

  static async editBranch(branch: Branch) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/branch/${branch.id}`, {branch})
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  static async addBranch(branch: Branch) {
    try {
      const cookies = new Cookies()
      const userId = cookies.get('userId')
      const res = await axios.post(`http://localhost:5000/api/branch/${userId}`, {branch})
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBranch(branch: Branch) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/branch/${branch.id}`)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

}