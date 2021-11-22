import axios from "axios";
import qs from "qs";
import { USER} from "../constant";

export const BE_BASE_URL = "http://localhost:8080";
export const FE_BASE_URL = "http://localhost:3000"

function generateUrl(url) {
  return BE_BASE_URL + url;
}

const Url = {
  fetchCaptcha: generateUrl("/captcha"),
  isNeedCaptcha: generateUrl("/captcha/need"),
  userLogin: generateUrl("/user/login"),
  userLogout: generateUrl("/user/logout"),
  userUpdate: generateUrl("/user/update"),
  adminLogin: generateUrl("/admin/login"),
  adminLogout: generateUrl("/admin/logout"),
  adminUpdate: generateUrl("/admin/update"),
  fetchUserManageList: generateUrl("/admin/getAllUser"),
  checkSalaryList: generateUrl("/salary/check"),
  deleteUser: generateUrl("/admin/deleteUser"),
  restoreUser: generateUrl("/admin/restoreUser"),
  addUserAccount: generateUrl("/admin/registerUser"),
  uploadSalaryList: generateUrl("/salary/add"),
  fetchSalaryList: generateUrl("/salary/get"),
  deleteSalary: generateUrl("/salary/delete"),
}

const Query = {
  login: (data, userType) => {
    return axios({
      url: userType === USER ? Url.userLogin : Url.adminLogin,
      method: 'post',
      data: qs.stringify(data),
    })
  },
  logout: (userType) => {
    return axios({
      url: userType === USER ? Url.userLogout : Url.adminLogout,
      method: 'put',
    })
  },
  askNeedCaptcha: (data) => {
    return axios({
      url: Url.isNeedCaptcha,
      method: 'get',
      params: data
    })
  },
  fetchCaptcha: (data) => {
    return axios({
      url: Url.fetchCaptcha,
      method: 'post',
      data: qs.stringify(data),
    })
  },
  fetchSalary: (data) => {
    return axios({
      url: Url.fetchSalaryList,
      method: 'get',
      params: data
    })
  },
  uploadSalary: (data) => {
    return axios({
      url: Url.uploadSalaryList,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;'
      },
      data,
    })
  },
  checkSalary: (data) => {
    return axios({
      url: Url.checkSalaryList,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;'
      },
      data,
    })
  },
  deleteSalary: (data) => {
    return axios({
      url: Url.deleteSalary,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json;'
      },
      data
    })
  },
  updatePassword: (data, userType) => {
    return axios({
      url: this.state.userType === USER ? Url.userUpdate : Url.adminUpdate,
      method: 'put',
      data: qs.stringify(data)
    })
  },
  addUserAccount: (data) => {
    return axios({
      url: Url.addUserAccount,
      method: 'post',
      data: qs.stringify(data),
    })
  },
  deleteUserAccount: (username) => {
    return axios({
      url: Url.deleteUser + "/" + username,
      method: 'delete',
    })
  },
  restoreUserAccount: (username) => {
    return axios({
      url: Url.restoreUser + "/" + username,
      method: 'post',
    })
  },
  fetchUserManageList: () => {
    return axios({
      url: Url.fetchUserManageList,
      method: 'get',
    })
  },
}
export default Query;