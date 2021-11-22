import {connect} from "react-redux";
import {Component} from "react";
import UserManageListUI from "./UserManageListUI"
import {Button, Input, message, Popconfirm, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { setUserManageList} from "../../../redux/actions/UserManageAction";
import {HTTPCode, PS_FETCH_USER_MANAGE_LIST} from "../../../constant";
import PubSub from "pubsub-js"
import Query from "../../../api/query";

class UserManageList extends Component {
  componentDidMount() {
    this.fetchUserManageList();
    PubSub.subscribe(PS_FETCH_USER_MANAGE_LIST, () => {
      this.fetchUserManageList();
    })
  }

  state = {
    searchText: '',
    searchedColumn: '',
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
      <div style={{color: filtered ? '#1890ff' : '#666666'}}><SearchOutlined/><span className="SearchNotice"> 查找</span>
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

  fetchUserManageList = () => {
    Query.fetchUserManageList().then(res => {
      const response = res.data;
      for (let i = 0; i < response.data.userManageList.length; i++) {
        response.data.userManageList[i].key = i;
      }
      this.props.setUserManageList(response.data.userManageList);
    }).catch(e => {
      console.log(e);
      message.error("获取员工信息表出错了！" + e, 10);
    })
  }

  deleteUserAccount = (username) => {
    Query.deleteUserAccount(username).then(res => {
      const response = res.data;
      if (response.metaInfo.status === HTTPCode.ok) {
        message.success("删除成功", 5);
      } else {
        message.error(response.metaInfo.msg, 10);
      }
      this.fetchUserManageList();
    }).catch(e => {
      console.log(e);
      message.error("删除出错了！" + e, 10);
      this.fetchUserManageList();
    })
  }

  restoreUserAccount = (username) => {
    Query.restoreUserAccount(username).then(res => {
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
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ...this.getColumnSearchProps('name', '姓名'),
        },
        {
          title: '身份证号',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
          ...this.getColumnSearchProps('username', '身份证号'),
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          align: 'center',
          render: (text, record) => (
            <Space size="middle">
              <Popconfirm title="确认恢复账号？" onConfirm={() => {
                this.restoreUserAccount(record.username)
              }} okText="确认" cancelText="取消">
                <Button type="link"> 恢复密码</Button>
              </Popconfirm>
              |
              <Popconfirm title="确认删除账号？" onConfirm={() => {
                this.deleteUserAccount(record.username)
              }} okText="确认" cancelText="取消">
                <Button type="link"> 删除账号</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]
    ;

    return (
      <UserManageListUI columns={columns} userManageList={this.props.userManageList}/>
    )
  }
}

const stateToProps = (state) => {
  return {
    userManageList: state.UserManageReducer.userManageList,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    setUserManageList(userManageList) {
      dispatch(setUserManageList(userManageList))
    }
  };
};

export default connect(stateToProps, dispatchToProps)(UserManageList);
