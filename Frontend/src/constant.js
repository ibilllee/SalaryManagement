// import {Redirect, Route} from "react-router-dom";
// import SalaryTable from "./components/SalaryTable/SalaryTable";
// import MyRoute from "./utils/MyRoute";
// import CheckInPage from "./components/CheckInPage/CheckInPage";
// import UserManagePage from "./components/UserManagePage/UserManagePage";
// import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
// import SystemDescribeUI from "./components/SystemDescribe/SystemDescribeUI";
// import AccountInfoUI from "./components/AccountInfo/AccountInfoUI";
// import PermissionDeniedUI from "./components/ErrorPage/PermissionDeniedUI";
// import NotFoundUI from "./components/ErrorPage/NotFoundUI";
// import React from "react";

export const USER = "USER";
export const ADMIN = "ADMIN"

export const MONTHLY_SALARY = "MONTHLY_SALARY";
export const NORMAL_SALARY = "NORMAL_SALARY";

export const SHOULD_PAID_TEXT = "应发合计";
export const SHOULD_DEDUCT_TEXT = "应扣合计";
export const REAL_PAID_TEXT = "实发"

export const NAME_INDEX = 0;
export const ID_NUMBER_INDEX = 1;
export const DATE_INDEX = 2;
export const MAX_FIXED_INDEX = 2;

export const HTTPCode={
  ok:200,
  danger:420,
  unprocessable:422
}

//------Message Key------
export const UPLOAD_SALARY_MESSAGE_KEY ="UPLOAD_SALARY_MESSAGE_KEY";
//------Message Key------

//------Pub-Sub------
export const PS_FETCH_USER_MANAGE_LIST ="PS_FETCH_USER_MANAGE_LIST";
export const PS_FETCH_SALARY_LIST ="PS_FETCH_SALARY_LIST";
export const PS_LOGOUT ="PS_LOGOUT";
//------Pub-Sub------

//------Session------
export const SESSION_IS_LOGIN="SESSION_IS_LOGIN";
export const SESSION_USER_TYPE="SESSION_USER_TYPE";
export const SESSION_USER_NAME="SESSION_USER_NAME";
export const SESSION_USERNAME="SESSION_USERNAME";
//------Session------

//------URL------
export const URL_ROOT="/";
export const URL_LOGIN="/login";
export const URL_MAIN="/main";
export const URL_CHECK_IN="/check_in";
export const URL_USER_MANAGE="/user_manage";
export const URL_UPDATE_PASSWORD="/update_password";
export const URL_SYSTEM_DESCRIBE="/system_describe";
export const URL_ACCOUNT_INFO="/account_info";
export const URL_PERMISSION_DENIED="/403";
export const URL_NOT_FOUNT="/404";
export const URL_ANY="/*";