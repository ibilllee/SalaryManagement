import React from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {SESSION_IS_LOGIN, SESSION_USER_TYPE, URL_LOGIN, URL_PERMISSION_DENIED, URL_ROOT} from "../constant";

class MyRoute extends React.Component {
  state={
    isAuthenticated:(sessionStorage.getItem(SESSION_USER_TYPE) === this.props.userType),
    isLogin : (sessionStorage.getItem(SESSION_IS_LOGIN) === "true"),
  }

  render() {
    let {
      component: Component,
      path = URL_ROOT,
      exact = false,
      strict = false,
      needLogin = true,
      isPrivate = false,
    } = this.props;
    if (needLogin) {
      if (isPrivate) {
        return (
          this.state.isAuthenticated ?
            (<Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)}/>) :
            (<Switch>
              <Redirect from={path} to={URL_PERMISSION_DENIED}/>
            </Switch>)
        )
      } else {
        return this.state.isLogin ?
          (<Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)}/>) :
          (<Switch>
            <Redirect from={path} to={URL_LOGIN}/>
          </Switch>)
      }
    } else {
      return (<Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)}/>);
    }
  }
}

export default withRouter(MyRoute);