import { Table} from 'antd';


const UserManageListUI = (props) => {
    return (
        <div>
          <Table pagination={{defaultPageSize:20}} columns={props.columns} dataSource={props.userManageList} scroll={{x:true}}/>
        </div>
    );
};

export default UserManageListUI;