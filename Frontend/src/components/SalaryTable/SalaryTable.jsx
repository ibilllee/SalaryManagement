import {connect} from "react-redux";
import React, {Component} from "react";
import SalaryTableUI from "./SalaryTableUI";
import {Tag, Button, Input, Space, message} from "antd";
import {SearchOutlined, ZoomInOutlined} from "@ant-design/icons";
import {
  queryData,
  setIsModelVisible,
  setDetailedSalaryList,
  setModalTableType,
  setSummarySalary, setSalaryId, clearSalaryList, setSalaryList, setPagination, setSalaryName,
} from "../../redux/actions/SalaryTableAction";
import Highlighter from "react-highlight-words";
import {HTTPCode, NORMAL_SALARY, PS_FETCH_SALARY_LIST, SESSION_USER_NAME} from "../../constant";
import PubSub from "pubsub-js"
import Query from "../../api/query";

class SalaryTable extends Component {
  componentDidMount() {
    if (this.props.loadRemote) {
      this.fetchSalary();
    }
    this.setState({name: sessionStorage.getItem(SESSION_USER_NAME)});
    this.props.setPagination({pageSize: this.props.defaultPageSize === undefined ? 10 : this.props.defaultPageSize})
    PubSub.subscribe(PS_FETCH_SALARY_LIST, () => {
      this.fetchSalary();
    })
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  state = {
    searchText: '',
    searchedColumn: '',
    selectedObject: [],
    selectedRowKeys: [],
    isFetching: false,
    name: '',
  };

  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`查找 ${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => {
            confirm();
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex,
            });
          }
          }
          style={{marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            style={{width: 90}}
            icon={<SearchOutlined/>}
            onClick={() => {
              confirm({closeDropdown: true});
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            搜索
          </Button>
          <Button
            style={{width: 90}}
            onClick={() => {
              clearFilters();
              this.setState({searchText: ''});
            }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered =>
      <div style={{color: filtered ? '#1890ff' : '#666666'}}><SearchOutlined/>
        {/*<span className="SearchNotice"></span>*/}
      </div>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedObject: selectedRows});
    this.setState({selectedRowKeys});
  };

  handleTableChangeRemote = (pagination, filters = {name: '', date: '', username: ''}, sorter) => {
    console.log(filters);
    this.fetchSalary({
      pagination,
      filter: {
        name: (filters.name === null || filters.name === undefined) ? '' : filters.name[0],
        date: (filters.date === null || filters.date === undefined) ? '' : filters.date[0],
        username: (filters.username === null || filters.username === undefined) ? '' : filters.username[0],
      },
    });
  };

  handleTableChangeLocal = (pagination, filters, sorter) => {
    this.props.setPagination(pagination);
  };

  fetchSalary = (params = {
    pagination: {current: 1, pageSize: this.props.defaultPageSize === undefined ? 10 : this.props.defaultPageSize},
    filter: {'name': '', 'date': '', 'username': ''}
  }) => {
    this.setState({isFetching: true});
    Query.fetchSalary({
      currentPage: params.pagination.current,
      pageSize: params.pagination.pageSize,
      filter: params.filter,
    }).then(res => {
      this.setState({isFetching: false});
      const response = res.data;
      if (response.data.salaryList == null) return;
      for (let i = 0; i < response.data.salaryList.length; i++) {
        response.data.salaryList[i].key = i;
      }
      this.props.setSalaryList(response.data.salaryList);
      this.props.setPagination({
        ...params.pagination,
        total: response.data.total
      })
    }).catch(e => {
      console.log(e);
      message.error("获取工资表出错了！" + e, 10);
    })
  }

  deleteSalary = () => {
    if (this.state.selectedObject.length === 0) {
      message.error("所选工资信息为空！");
      return;
    }
    Query.deleteSalary(this.state.selectedObject).then(res => {
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success(response.metaInfo.msg, 5);
      } else {
        message.error(response.metaInfo.msg, 10);
      }
      this.setState({selectedRowKeys: []});
      this.fetchSalary();
      console.log(this.state.selectedRowKeys)
    }).catch(e => {
      console.log(e);
      message.error("删除工资出错了！" + e, 10);
      this.setState({selectedRowKeys: []});
      this.fetchSalary();
    })
  }

  render() {
    const getSalaryTableColumns = () => {
      let columns = [];
      columns.push({
        title: "流水号",
        dataIndex: "id",
        key: "id",
        align: "center",
        // responsive: ["sm"],
      });
      if (!this.props.totalDisplayName)
        columns.push({
          title: "姓名",
          dataIndex: "name",
          key: "name",
          align: "center",
          ...this.getColumnSearchProps('name', '姓名'),
        });
      if (this.props.displayIdNumber)
        columns.push({
          title: "身份证号",
          dataIndex: "username",
          key: "username",
          align: "center",
          ...this.getColumnSearchProps('username', '身份证号'),
        })
      columns.push(
        {
          title: "日期",
          key: "date",
          dataIndex: "date",
          align: "center",
          ...this.getColumnSearchProps('date', '日期'),
          render: (date, item) => {
            let color = "geekblue";
            if (item.modalTableType === NORMAL_SALARY) {
              color = "red";
            }
            return (
              <Tag color={color} key={date}>
                {date}
              </Tag>
            );
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (text) => (
            <Button
              onClick={() => {
                this.props.handleCheckButtonClick(text.id, text.name, text.modalTableType, text.salaryDetail, text.salarySummary);
              }}
            >
            <span className="CheckButtonIcon">
              <ZoomInOutlined/>
              &nbsp;
            </span>
              查看
            </Button>
          ),
        });
      return columns;
    };

    const salaryTableColumns = getSalaryTableColumns();

    return (
      <div>
        <SalaryTableUI
          displaySelector={this.props.displaySelector}
          totalDisplayName={this.props.totalDisplayName}
          rowSelection={{selectedRowKeys: this.state.selectedRowKeys, onChange: this.onSelectChange}}
          salaryTableColumns={salaryTableColumns}
          salaryId={this.props.salaryId}
          salaryName={this.props.salaryName}
          salaryList={this.props.salaryList}
          setIsModelVisible={this.props.setIsModelVisible}
          isModelVisible={this.props.isModelVisible}
          handleTableChange={this.props.loadRemote ? this.handleTableChangeRemote : this.handleTableChangeLocal}
          pagination={this.props.pagination}
          deleteSalary={this.deleteSalary}
          isFetching={this.state.isFetching}
          name={this.state.name}
        />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    salaryId: state.SalaryTableReducer.salaryId,
    salaryName: state.SalaryTableReducer.salaryName,
    salaryList: state.SalaryTableReducer.salaryList,
    pagination: state.SalaryTableReducer.pagination,
    loading: state.SalaryTableReducer.loading,
    onChange: state.SalaryTableReducer.onChange,
    isModelVisible: state.SalaryTableReducer.isModelVisible,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    queryDataRemote() {
      dispatch(queryData());
    },
    clearSalaryList() {
      dispatch(clearSalaryList());
    },
    setIsModelVisible(visible) {
      dispatch(setIsModelVisible(visible));
    },
    handleCheckButtonClick(salaryId, salaryName, modalTableType, detailedSalaryList, summarySalary) {
      dispatch(setSalaryId(salaryId));
      dispatch(setSalaryName(salaryName));
      dispatch(setIsModelVisible(true));
      dispatch(setModalTableType(modalTableType));
      dispatch(setDetailedSalaryList(detailedSalaryList));
      dispatch(setSummarySalary(summarySalary));
    },
    setPagination(pagination) {
      dispatch(setPagination(pagination));
    },
    setSalaryList(salaryList) {
      dispatch(setSalaryList(salaryList));
    }

  };
};

export default connect(stateToProps, dispatchToProps)(SalaryTable);
