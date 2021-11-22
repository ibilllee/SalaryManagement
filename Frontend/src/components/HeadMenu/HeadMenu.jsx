import {connect} from "react-redux";
import {Component} from "react";
import HeadMenuUI from "./HeadMenuUI";
import {HTTPCode, PS_LOGOUT, SESSION_IS_LOGIN, SESSION_USER_TYPE, URL_LOGIN} from "../../constant";
import {FE_BASE_URL} from "../../api/query";
import {message} from "antd";
import PubSub from "pubsub-js"
import Query from "../../api/query";

class HeadMenu extends Component {
  componentDidMount() {
    PubSub.subscribe(PS_LOGOUT, () => {
      this.logout()
    })
  }

  state = {
    current: 'mail',
  };

  logout = () => {
    Query.logout(sessionStorage.getItem(SESSION_USER_TYPE)).then(res => {
      let response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success({content: "登出成功", duration: 5})
        sessionStorage.removeItem(SESSION_IS_LOGIN);
        sessionStorage.removeItem(SESSION_USER_TYPE);
        window.location.href = FE_BASE_URL + '/#' + URL_LOGIN;
      } else {
        message.error({content: "登出失败：" + response.metaInfo.msg, duration: 5})
      }
    }).catch(res => {
      message.error({content: "登出失败：" + res, duration: 5})
    })
  }

  render() {
    return (
      <HeadMenuUI logout={this.logout}/>
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(HeadMenu);
