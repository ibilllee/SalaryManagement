import {connect} from "react-redux";
import {Component} from "react";
import LoginPageUI from "./LoginPageUI";
import {message, notification} from "antd";
import {saveCaptchaToken, setCaptchaImg, setNeedCaptcha} from "../../redux/actions/LoginAction";
import {getDeviceId, getIp, isWeixn} from "../../utils/EnvironmentTools";
import {HTTPCode} from "../../constant";
import Query from "../../api/query";

class LoginPage extends Component {

  componentDidMount() {
    this.askNeedCaptcha();
    if(isWeixn()){
      message.success({content: "启用微信快捷登录"});
      this.loginByWx();
    }else {
      notification['success']({
        message: '免密登录提示',
        duration: '10',
        description:
        <div>通过微信/企业微信中<b>工资查询</b>应用进入，可免密码登录系统</div>
      });
    }
  }

  askNeedCaptcha = () => {
    Query.askNeedCaptcha({
      'deviceId': getDeviceId(),
      'ip': getIp(),
    }).then(res => {
      const response = res.data;
      if (response.metaInfo.status !== HTTPCode.ok) {
        this.getCaptcha();
        this.props.setNeedCaptcha(true);
      } else {
        this.props.setNeedCaptcha(false);
      }
    }).catch(res => {
      console.log(res);
    })
  }

  getCaptcha = () => {
    Query.fetchCaptcha({
      'deviceId': getDeviceId(),
      'ip': getIp(),
    }).then(res => {
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.danger || response.data.decisionType >= 1) {
        this.props.setNeedCaptcha(true);
      } else {
        this.props.setNeedCaptcha(false);
      }
      this.props.setCaptchaImg(response.data.verifyImg);
      this.props.saveCaptchaToken(response.data.verifyToken);
      if (response.metaInfo.status !== HTTPCode.ok
      ) {
        message.warning({content: response.metaInfo.msg, duration: 5});
      }
    }).catch(res => {
      console.log("获取验证码失败", res);
    })
  }

  loginByWx = () => {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa989392593543c96&redirect_uri=http%3A%2F%2Fbill.cab%3A8080%2Fwxbe%2Fqyweixin%2Foauth%3Furl%3Dhttp%3A%2F%2Fbill.cab%3A8080%2Fwxbe%2Fqyweixin%2Fhome%3FuserId%3DUSERID&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect";
  }

  render() {
    return (
      <div>
        <LoginPageUI getCaptcha={this.getCaptcha}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {
    setCaptchaImg(captchaImg) {
      dispatch(setCaptchaImg(captchaImg));
    },
    saveCaptchaToken(captchaToken) {
      dispatch(saveCaptchaToken(captchaToken));
    },
    setNeedCaptcha(needCaptcha) {
      dispatch(setNeedCaptcha(needCaptcha));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(LoginPage);
