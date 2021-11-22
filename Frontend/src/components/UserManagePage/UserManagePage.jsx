import {connect} from "react-redux";
import {Component} from "react";
import UserManagePageUI from "./UserManagePageUI"

class UserManagePage extends Component {
  componentDidMount() {
  }

  state = {
    isModalVisible: false,
  };

  handleAddUserButtonClick = () => {
    this.setState({isModalVisible: true});
  }

  handleAddUserModalClose = ()=>{
    this.setState({isModalVisible:false})
  }

  render() {
    return (
      <UserManagePageUI
        isModalVisible={this.state.isModalVisible}
        handleAddUserButtonClick={this.handleAddUserButtonClick}
        handleAddUserModalClose={this.handleAddUserModalClose}
      />
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(UserManagePage);
