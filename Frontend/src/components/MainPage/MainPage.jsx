import {connect} from "react-redux";
import {Component} from "react";
import MainPageUI from "./MainPageUI";
import {
  ADMIN, SESSION_USER_NAME, SESSION_USER_TYPE,
} from "../../constant";
import {setSalaryList} from "../../redux/actions/SalaryTableAction";
import {message} from "antd";

class MainPage extends Component {
  state = {isAdmin: false}

  constructor(props) {
    super(props);
    message.success({content: sessionStorage.getItem(SESSION_USER_NAME)+"，欢迎您" ,duration: 2})
  }

  componentDidMount() {
    this.setState({isAdmin: sessionStorage.getItem(SESSION_USER_TYPE) === ADMIN});

  }


  render() {
    return (
      <div>
        <MainPageUI isAdmin={this.state.isAdmin}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {};
};

const dispatchToProps = (dispatch) => {
  return {
    setSalaryList(salaryList) {
      dispatch(setSalaryList(salaryList));
    },
  };
};

export default connect(stateToProps, dispatchToProps)(MainPage);
