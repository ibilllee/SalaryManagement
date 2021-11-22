import {Timeline} from "antd";
import {SESSION_USER_NAME, SESSION_USERNAME} from "../../constant";

const AccountInfoUI = (props) => {

  return (
    <div style={{backgroundColor: "white"}}>
      <div style={{margin: "20px auto", padding: "0px 15px 0px 15px", width: "300px"}}>
        <h1 style={{textAlign: 'center', paddingTop: '20px'}}>账号信息</h1>
      </div>
      <div style={{paddingLeft: "50px", paddingRight: "50px", width: "100%"}}>
        <Timeline mode='left' style={{marginLeft:'-50px',marginTop:'50px'}}>
          <Timeline.Item label="姓名">{sessionStorage.getItem(SESSION_USER_NAME)}</Timeline.Item>
          <Timeline.Item label="用户名">{sessionStorage.getItem(SESSION_USERNAME)}</Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default AccountInfoUI;
