import {connect} from "react-redux";
import {Component} from "react";
import LoginFormUI from "./LoginFormUI";
import {getDeviceId, getIp} from "../../../utils/EnvironmentTools";
import {FE_BASE_URL} from "../../../api/query";
import {message} from "antd";
import {
  HTTPCode,
  SESSION_IS_LOGIN,
  SESSION_USER_NAME,
  SESSION_USER_TYPE,
  SESSION_USERNAME,
  USER
} from "../../../constant";
import {setNeedCaptcha} from "../../../redux/actions/LoginAction";
import Query from "../../../api/query";
import {withRouter} from "react-router-dom";

class LoginForm extends Component {
  componentDidMount() {
  }

  checkResponseNeedCaptcha = (data) => {
    if (data.metaInfo.status === HTTPCode.danger ||
      (data.data != null && data.data.decisionType >= 1)) {
      this.props.setNeedCaptcha(true);
      setTimeout(() => {
        this.props.getCaptcha();
      }, 600);
    } else {
      this.props.setNeedCaptcha(false);
    }
  }

  submitLogin = (values) => {
    let data = {
      ...values,
      "verifyToken": this.props.captchaToken,
      "ip": getIp(),
      "deviceId": getDeviceId()
    };
    let loginKey = "LOGIN_KEY";
    message.loading({content: "登录中...", key: loginKey});
    Query.login(data, this.props.type).then(res => {
      let response = res.data;
      console.log(response);
      this.checkResponseNeedCaptcha(response);
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success({
          content: "登录成功",
          key: loginKey,
          duration: 1
        })
        sessionStorage.setItem(SESSION_IS_LOGIN, "true");
        sessionStorage.setItem(SESSION_USER_TYPE, this.props.type);
        sessionStorage.setItem(SESSION_USER_NAME, this.props.type === USER ? response.data.name : "管理员");
        sessionStorage.setItem(SESSION_USERNAME, values.username);
        window.location.href = FE_BASE_URL + '/';
      } else {
        message.error({content: response.metaInfo.msg, key: loginKey, duration: 5})
      }
    }).catch(res => {
      message.error({content: "登录失败：" + res, key: loginKey, duration: 5})
    })
  }

  render() {
    return (
      <div>
        <LoginFormUI
          input1Label={this.props.input1Label}
          input1Placeholder={this.props.input1Placeholder}
          input2Label={this.props.input2Label}
          input2Placeholder={this.props.input2Placeholder}
          captchaImg={this.props.captchaImg}
          getCaptcha={this.props.getCaptcha}
          submitLogin={this.submitLogin}
          needCaptcha={this.props.needCaptcha}
        />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    captchaImg: state.LoginReducer.captchaImg,
    captchaToken: state.LoginReducer.captchaToken,
    needCaptcha: state.LoginReducer.needCaptcha,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    setNeedCaptcha(needCaptcha) {
      dispatch(setNeedCaptcha(needCaptcha));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(LoginForm));
