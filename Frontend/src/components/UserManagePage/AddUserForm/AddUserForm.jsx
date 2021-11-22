import {connect} from "react-redux";
import React,{Component} from "react";
import AddUserFormUI from "./AddUserFormUI";
import {HTTPCode, PS_FETCH_USER_MANAGE_LIST} from "../../../constant";
import {message} from "antd";
import PubSub from "pubsub-js"
import Query from "../../../api/query";

class AddUserForm extends Component {
  componentDidMount() {
  }

  formRef = React.createRef();

  addUserAccount = (value) => {
    Query.addUserAccount(value).then(res => {
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success("注册成功", 5);
        this.formRef.current.resetFields();
        this.props.handleAddUserModalClose();
      } else {
        message.error(response.metaInfo.msg, 10);
      }
      PubSub.publish(PS_FETCH_USER_MANAGE_LIST);
    }).catch(e => {
      console.log(e);
      message.error("注册出错了！" + e, 10);
      PubSub.publish(PS_FETCH_USER_MANAGE_LIST);
    })
  }

  render() {
    return (
      <div>
        <AddUserFormUI addAccount={this.addUserAccount} formRef={this.formRef}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(AddUserForm);
