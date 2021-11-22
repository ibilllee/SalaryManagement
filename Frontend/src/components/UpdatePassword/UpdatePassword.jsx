import {connect} from "react-redux";
import {Component} from "react";
import UpdatePasswordUI from "./UpdatePasswordUI";
import { HTTPCode, SESSION_USER_TYPE} from "../../constant";
import {message} from "antd";
import Query from "../../api/query";

class UpdatePassword extends Component {
  state = {userType: null}

  componentDidMount() {
    this.setState({userType: sessionStorage.getItem(SESSION_USER_TYPE)});
  }

  updatePassword = (value) => {
    Query.updatePassword(value).then(res => {
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success("修改成功", 5);
      } else {
        message.error(response.metaInfo.msg, 10);
      }
    }).catch(e => {
      console.log(e);
      message.error("修改出错了！" + e, 10);
    })
  }

  render() {
    return (
      <UpdatePasswordUI updatePassword={this.updatePassword}/>
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(UpdatePassword);
