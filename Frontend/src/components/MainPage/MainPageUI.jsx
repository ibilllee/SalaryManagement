import "./MainPageUI.css";
import {BackTop, Layout} from "antd";
import HeadMenu from "../HeadMenu/HeadMenu";
import SalaryTable from "../SalaryTable/SalaryTable";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SystemDescribeUI from "../SystemDescribe/SystemDescribeUI";
import {Redirect, Route, Switch} from "react-router-dom";
import CheckInPage from "../CheckInPage/CheckInPage"
import NotFoundUI from "../ErrorPage/NotFoundUI";
import PermissionDeniedUI from "../ErrorPage/PermissionDeniedUI";
import UserManagePage from "../UserManagePage/UserManagePage";
import MyRoute from "../../utils/MyRoute";
import {
  ADMIN, URL_ACCOUNT_INFO, URL_ANY,
  URL_CHECK_IN,
  URL_MAIN, URL_NOT_FOUNT, URL_PERMISSION_DENIED,
  URL_ROOT,
  URL_SYSTEM_DESCRIBE,
  URL_UPDATE_PASSWORD,
  URL_USER_MANAGE
} from "../../constant";
import React from "react";
import AccountInfoUI from "../AccountInfo/AccountInfoUI";

const {Content, Footer} = Layout;

const MainPageUI = (props) => {
  // let {} = props;
  return (
    <div>
      <BackTop />
      <Layout className="contentLayout">
        <HeadMenu/>
        <Content id="mainContent">
          <Switch>
            <Route exact path={URL_ROOT} component={() => (
              <SalaryTable loadRemote={true} displayIdNumber={props.isAdmin} displaySelector={props.isAdmin} totalDisplayName={!props.isAdmin}/>)}/>
            <Route path={URL_MAIN} component={() => (
              <SalaryTable loadRemote={true} displayIdNumber={props.isAdmin} displaySelector={props.isAdmin} totalDisplayName={!props.isAdmin}/>)}/>
            <MyRoute path={URL_CHECK_IN} component={CheckInPage} userType={ADMIN} isPrivate/>
            <MyRoute path={URL_USER_MANAGE} component={UserManagePage} userType={ADMIN} isPrivate/>
            <MyRoute path={URL_UPDATE_PASSWORD} component={UpdatePassword}/>
            <MyRoute path={URL_SYSTEM_DESCRIBE} component={SystemDescribeUI}/>
            <MyRoute path={URL_ACCOUNT_INFO} component={AccountInfoUI}/>
            <Route path={URL_PERMISSION_DENIED} component={PermissionDeniedUI}/>
            <Route path={URL_NOT_FOUNT} component={NotFoundUI}/>
            <Redirect from={URL_ANY} to={URL_NOT_FOUNT}/>
          </Switch>
        </Content>
        <Footer style={{textAlign: "center"}}>
          工资管理系统 ©2021
        </Footer>
      </Layout>
    </div>
  );
};

export default MainPageUI;
