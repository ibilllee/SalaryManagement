import {connect} from "react-redux";
import React, {Component} from "react";
import CheckInPageUI from "./CheckInPageUI"
import {
  DATE_INDEX, HTTPCode,
  ID_NUMBER_INDEX, MAX_FIXED_INDEX,
  MONTHLY_SALARY,
  NAME_INDEX, NORMAL_SALARY,
  REAL_PAID_TEXT,
  SHOULD_DEDUCT_TEXT,
  SHOULD_PAID_TEXT, UPLOAD_SALARY_MESSAGE_KEY
} from "../../constant";
import {message, Modal} from "antd";
import * as XLSX from "xlsx";
import {clearSalaryList, setPagination, setSalaryList} from "../../redux/actions/SalaryTableAction";
import Query from "../../api/query";


class CheckInPage extends Component {
  state = {
    current: 0,
    uploadFile: {},
    modalTableType: NORMAL_SALARY,
    isModalVisible: false,
    isVerifying: true,
    isLegal: false,
    illegalMsg: '',
    isUploadSalarySuccess: false,
    uploadSalaryMsg: '',
    windowWidth: document.body.clientWidth,
  }

  componentDidMount() {
    this.props.clearSalaryList();
    this.setState({windowWidth: document.body.clientWidth})
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({windowWidth: document.body.clientWidth})
  }

  generateSalaryList = (data, type) => {
    const number = data.length - 1;
    for (let i = 0; i < data[0].length; i++) {
      data[0][i] = data[0][i].replace(/[\r\n]/g, "");
      data[0][i] = data[0][i].replace(/\s*/g, "");
    }
    let salaryList = []

    let emptyMsg = [];
    if (type === MONTHLY_SALARY) {
      const shouldPaidIndex = data[0].indexOf(SHOULD_PAID_TEXT);
      const shouldDeductIndex = data[0].indexOf(SHOULD_DEDUCT_TEXT);
      const realPaidIndex = data[0].indexOf(REAL_PAID_TEXT);
      if (shouldPaidIndex === -1) {
        message.error("“" + SHOULD_PAID_TEXT + "”字段未找到", 10);
        this.setUploadFile({});
        return null;
      }
      if (shouldDeductIndex === -1) {
        message.error("“" + SHOULD_DEDUCT_TEXT + "”字段未找到", 10);
        this.setUploadFile({});
        return null;
      }
      if (realPaidIndex === -1) {
        this.setUploadFile({});
        message.error("“" + REAL_PAID_TEXT + "”字段未找到", 10);
        return null;
      }


      //生成工资表
      for (let i = 1; i <= number; i++) {
        //生成每一条内容
        let salaryListItem = {
          key: i,
          id: i,
          name: data[i][NAME_INDEX],
          username: data[i][ID_NUMBER_INDEX],
          date: data[i][DATE_INDEX],
          modalTableType: MONTHLY_SALARY,
          salarySummary: {
            sPaid: data[i][shouldPaidIndex],
            sDeduct: data[i][shouldDeductIndex],
            rPaid: data[i][realPaidIndex],
          }
        }
        let salaryDetail = [];

        const shouldPaidItemNumber = shouldPaidIndex - MAX_FIXED_INDEX;
        const shouldDeductItemNumber = shouldDeductIndex - shouldPaidIndex;
        const detailedListLength = Math.max(shouldPaidItemNumber, shouldDeductItemNumber);
        for (let j = 1; j < detailedListLength; j++) {
          let salaryDetailItem = {
            key: j,
            paid: j >= shouldPaidItemNumber ? "" : data[0][MAX_FIXED_INDEX + j],
            paidPrice: j >= shouldPaidItemNumber ? "" : data[i][MAX_FIXED_INDEX + j],
            deduct: j >= shouldDeductItemNumber ? "" : data[0][shouldPaidIndex + j],
            deductPrice: j >= shouldDeductItemNumber ? "" : data[i][shouldPaidIndex + j],
          }
          salaryDetail.push(salaryDetailItem);
          if (salaryDetailItem.paid === undefined || salaryDetailItem.paidPrice === undefined
            || salaryDetailItem.deduct === undefined || salaryDetailItem.deductPrice === undefined) {
            emptyMsg.push({i, j});// += "第" + i + "条数据，详细工资中的第" + j + "行";
          }
        }
        salaryListItem['salaryDetail'] = salaryDetail;
        salaryList.push(salaryListItem);
      }
    } else {
      //生成工资表
      for (let i = 1; i <= number; i++) {
        //生成每一条内容
        let salaryListItem = {
          key: i,
          id: i,
          name: data[i][NAME_INDEX],
          username: data[i][ID_NUMBER_INDEX],
          date: data[i][DATE_INDEX],
          modalTableType: NORMAL_SALARY,
        }
        let salaryDetail = [];

        for (let j = 1; j < data[i].length - MAX_FIXED_INDEX; j++) {
          let salaryDetailItem = {
            key: j,
            title: data[0][MAX_FIXED_INDEX + j],
            content: data[i][MAX_FIXED_INDEX + j],
          }
          salaryDetail.push(salaryDetailItem);
          if (salaryDetailItem.title === undefined || salaryDetailItem.content === undefined)
            emptyMsg.push({i, j});
        }
        salaryListItem['salaryDetail'] = salaryDetail;
        salaryList.push(salaryListItem);
      }
    }
    this.props.setSalaryList(salaryList);
    this.props.setPagination({current: 1, pageSize: 10, total: salaryList.length})

    if (emptyMsg.length !== 0) {
      Modal.warning({
        title: '提示：存在空白单元格',
        content: (<div>
          {
            emptyMsg.map((value) => (
              <div>第{value.i}条数据，详细工资中的第{value.j}行</div>
            ))
          }
        </div>),
        okText: "知道了"

      });
    }

  }

  readExcel = (file, type = NORMAL_SALARY) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const {result} = event.target;
        const workbook = XLSX.read(result, {type: 'binary'});// 以二进制流方式读取得到整份excel表格对象
        let data = [];
        for (const sheet in workbook.Sheets) {//默认读取第一张表
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {header: 1});
            this.generateSalaryList(data, type);
            break;
          }
        }
      } catch (e) {
        console.log(e);
        message.error("识别文件出错了！" + e, 10);
      }
    };
    fileReader.readAsBinaryString(file);
  }

  uploadSalary = () => {
    message.loading({content: "录入工资中", key: UPLOAD_SALARY_MESSAGE_KEY});
    Query.uploadSalary(this.props.salaryList).then(res => {
      const response = res.data;
      message.destroy(UPLOAD_SALARY_MESSAGE_KEY);
      if (response.metaInfo.status === HTTPCode.ok) {
        this.setState({
          isUploadSalarySuccess: true,
          uploadSalaryMsg: response.data.msg,
        });
      } else {
        this.setState({
          isUploadSalarySuccess: false,
          uploadSalaryMsg: response.data.msg,
        });
      }
      this.nextPage();
    }).catch(e => {
      message.destroy(UPLOAD_SALARY_MESSAGE_KEY);
      console.log(e);
      message.error({content: "录入工资出错了！" + e, duration: 10, key: UPLOAD_SALARY_MESSAGE_KEY});
      this.setState({
        isUploadSalarySuccess: false,
        uploadSalaryMsg: e,
      });
      this.nextPage();
    })
  }

  checkSalary = () => {
    this.setState({isModalVisible: true, isVerifying: true});
    Query.checkSalary(this.props.salaryList).then(res => {
      this.setState({isVerifying: false});
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        if (response.data.result === 0) {
          this.setState({isLegal: true});
        } else {
          this.setState({isLegal: false, illegalMsg: response.data.msg});
        }
      } else {
        console.log(response);
        message.error("检查工资表出错了！", 10);
      }
    }).catch(e => {
      console.log(e);
      message.error("出错了！" + e, 10);
    })
  }

  firstPage = () => {
    this.setState({current: 0});
  };

  nextPage = () => {
    this.setState({current: this.state.current + 1});
  };

  prevPage = () => {
    this.setState({current: this.state.current - 1});
  };

  setTheState = (newState) => {
    this.setState(newState);
  }

  chooseSalaryType = (salaryType) => {
    this.setState({modalTableType: salaryType});
    this.setState({current: this.state.current + 1});
    this.setState({uploadFile: {}})
  }

  render() {
    return (
      <div>
        <CheckInPageUI
          state={this.state}
          father={this}
          setState={this.setTheState}
        />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    salaryList: state.SalaryTableReducer.salaryList,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    setSalaryList(salaryList) {
      dispatch(setSalaryList(salaryList));
    },
    clearSalaryList() {
      dispatch(clearSalaryList());
    },
    setPagination(pagination) {
      dispatch(setPagination(pagination));
    },
  };
};

export default connect(stateToProps, dispatchToProps)(CheckInPage);
