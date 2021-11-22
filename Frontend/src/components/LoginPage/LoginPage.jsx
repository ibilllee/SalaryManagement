import {connect} from "react-redux";
import {Component} from "react";
import LoginPageUI from "./LoginPageUI";
import {message, notification} from "antd";
import {saveCaptchaToken, setCaptchaImg, setNeedCaptcha} from "../../redux/actions/LoginAction";
import {getDeviceId, getIp} from "../../utils/EnvironmentTools";
import {HTTPCode} from "../../constant";
import Query from "../../api/query";

class LoginPage extends Component {

  componentDidMount() {
    this.askNeedCaptcha();
    notification["info"]({
      message: '新版系统已上线！',
      description: (<span>使用<span style={{fontWeight:'bold',color:'#448EF7'}}>原用户名与密码</span>即可登录</span>),
      duration:5,
    });
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
