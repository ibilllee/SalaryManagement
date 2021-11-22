import UserManageList from "./UserManageList/UserManageList";
import {BackTop, Button, Modal} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";
import AddUserForm from "./AddUserForm/AddUserForm";
import "./UserManagePageUI.css"

const UserManagePageUI = (props) => {
  return (
    <div >
      <BackTop />
        <UserManageList/>
        <div style={{textAlign: 'center', paddingTop: '20px'}}>
          <Button
            type="primary" shape="round" icon={<PlusOutlined/>} size='large'
            onClick={props.handleAddUserButtonClick}>
            新增用户
          </Button></div>
        <Modal
          title={`添加新用户`}
          visible={props.isModalVisible}
          okText="关闭"
          cancelButtonProps={"danger"}
          style={{top: 20}}
          onCancel={() => {
            props.handleAddUserModalClose();
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                props.handleAddUserModalClose();
              }}
            >
              关闭
            </Button>
          ]}
        >
          <AddUserForm handleAddUserModalClose={props.handleAddUserModalClose}/>
        </Modal>
    </div>
  );
};

export default UserManagePageUI;