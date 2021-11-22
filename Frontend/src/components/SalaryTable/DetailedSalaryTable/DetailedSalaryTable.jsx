import { connect } from "react-redux";
import { Component } from "react";
import DetailedSalaryTableUI from "./DetailedSalaryTableUI";

class DetailedSalaryTable extends Component {
  componentDidMount() {
    console.log(this.props.detailedSalaryList)
  }

  render() {
    return (
      <DetailedSalaryTableUI
        detailedSalaryList={this.props.detailedSalaryList}
        summarySalary={this.props.summarySalary}
        modalTableType={this.props.modalTableType}
      />
    );
  }
}

const stateToProps = (state) => {
  return {
    detailedSalaryList: state.SalaryTableReducer.detailedSalaryList,
    summarySalary: state.SalaryTableReducer.summarySalary,
    modalTableType: state.SalaryTableReducer.modalTableType,
  };
};

const dispatchToProps = (dispatch) => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(DetailedSalaryTable);
