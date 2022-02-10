import {Tabs, Layout, Divider, Card, Button, Timeline, Tag} from "antd";
import LoginForm from "./LoginForm/LoginForm";
import logoURL from "../../asset/images/logo.png";
import backgroundURL from "../../asset/images/background.png";
import "./LoginPage.css"
import {Switch} from "react-router-dom";
import MyRoute from "../../utils/MyRoute";
import {ADMIN, USER} from "../../constant";
import {InfoOutlined} from '@ant-design/icons'
import Modal from "antd/es/modal/Modal";

const {Header} = Layout;
const {TabPane} = Tabs;

const LoginPageUI = (props) => {
  return (
    <div style={{width: '100%', minHeight: '100%', position: 'absolute'}}>
      <Header style={{background: "#ffffff"}}>
        <img
          id="titleLogo"
          width={35}
          height={35}
          className="logoImg"
          src={logoURL}
          style={{float: "left", marginTop: "15px"}}
          alt="加载失败"
        />
        <span
          id="titleText"
          style={{
            float: "left",
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
              工资管理系统
        </span>
        <Tag color="geekblue" style={{marginLeft:'10px',fontWeight:'bold'}}>
          新版
        </Tag>
        <span style={{float:'right'}}>
          <Button shape="circle" type="default" icon={<InfoOutlined />}
          onClick={()=>{
            Modal.info({
              title: '使用说明',
              content: (
                <div>
                  <Timeline style={{marginTop:'30px',marginBottom:'-50px',marginLeft:'-30px'}}>
                    <Timeline.Item>使用微信(关注企业号->工资查询)/企业微信(工作台->工资查询)中工资查询应用进入，可<b>免密登录</b></Timeline.Item>
                    <Timeline.Item>请在登录后及时点击退出登录以保证数据与隐私安全</Timeline.Item>
                    <Timeline.Item>若忘记密码，请联系管理员</Timeline.Item>
                  </Timeline>
                  <div style={{marginTop:'20px',textAlign:'right'}}>系统版本号：V1.1.0</div>
                </div>
              ),
              okText:"关闭"
            });
          }}/>
        </span>
      </Header>
      <Divider style={{margin: '0px'}}/>
      <div style={{
        display: 'inline-block',
        width: '100%',
        height: document.body.clientHeight * 0.82,
        minHeight: '550px',
        background: `url("${backgroundURL}") center center / cover no-repeat`,
        position: 'relative',
      }}>
        <Switch>
          <MyRoute path="/login" needLogin={false} component={() => (
            <div id="LoginCard"
              style={{

              }}>
              <Card>
                <Tabs
                  id="CardTabs"
                  defaultActiveKey="1"
                  centered
                  animated
                >
                  <TabPane tab="用户登录" key="1">
                    <div style={{marginTop: "10px"}}>
                      <LoginForm
                        input1Label="用户名"
                        input1Placeholder="请输入用户名"
                        input2Label="密码"
                        input2Placeholder="请输入密码"
                        getCaptcha={props.getCaptcha}
                        type={USER}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="管理员登录" key="2">
                    <div style={{marginTop: "10px"}}>
                      <LoginForm
                        input1Label="管理员用户名"
                        input1Placeholder="请输入管理员用户名"
                        input2Label="密码"
                        input2Placeholder="请输入密码"
                        type={ADMIN}
                        getCaptcha={props.getCaptcha}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          )}/>
        </Switch>
      </div>
      <div style={{textAlign: 'center', paddingTop: '10px', paddingBottom: '10px'}}>
        工资管理系统
      </div>
    </div>
  );
};

export default LoginPageUI;