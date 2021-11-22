import "./HeadMenuUI.css";
import logoURL from "../../asset/images/logo.png";
import {Link, withRouter} from "react-router-dom";
import {
  BankOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  SolutionOutlined,
  BarsOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import PubSub from "pubsub-js"
import {Menu, Layout, Row, Col, Modal} from "antd";
import {
  ADMIN,
  PS_LOGOUT,
  SESSION_USER_TYPE,
  URL_ACCOUNT_INFO, URL_CHECK_IN, URL_MAIN,
  URL_SYSTEM_DESCRIBE,
  URL_UPDATE_PASSWORD, URL_USER_MANAGE
} from "../../constant";

const {confirm} = Modal;
const {Header} = Layout;
const {SubMenu} = Menu;

const HeadMenuUI = withRouter(({history}) => {
  const isAdmin = sessionStorage.getItem(SESSION_USER_TYPE) === ADMIN;

  const dynamicDisplay = () => {
    return isAdmin ? (
      <SubMenu
        key="Operation"
        icon={<SettingOutlined/>}
        title={<span className="menuText"> 系统操作</span>}
      >
        <Menu.Item key={URL_CHECK_IN} icon={<MoneyCollectOutlined/>}>
          <Link to={URL_CHECK_IN}>工资录入</Link>
        </Menu.Item>
        <Menu.Item key={URL_USER_MANAGE} icon={<SolutionOutlined/>}>
          <Link to={URL_USER_MANAGE}>员工账号管理</Link>
        </Menu.Item>
      </SubMenu>
    ) : undefined;
  }

  return (
    <div>
      <Header style={{background: "#ffffff"}}>
        <Row>
          <Col flex="none">
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
          </Col>

          <Col flex="auto"/>
          <Col xs={9} sm={12} md={16}>
            <Row>
              <Col flex="auto"/>
              <Col flex="none">
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={[URL_MAIN]}
                  selectedKeys={[history.location.pathname]}
                  triggerSubMenuAction="click"
                  overflowedIndicator={
                    <div>
                      <BarsOutlined/> 更多操作
                    </div>
                  }
                >
                  <Menu.Item key={URL_MAIN}>
                    <Link to={URL_MAIN}><BankOutlined/><span className="menuText"> 主页</span></Link>
                  </Menu.Item>

                  {dynamicDisplay()}
                  <SubMenu
                    key="SubMenu"
                    icon={<UserOutlined/>}
                    title={isAdmin ? <span className="menuText"> 管理员中心</span> :
                      <span className="menuText">用户中心</span>}
                  >
                    <Menu.Item key={URL_ACCOUNT_INFO}>
                      <Link to={URL_ACCOUNT_INFO}><InfoCircleOutlined/> 账号信息</Link>
                    </Menu.Item>
                    <Menu.Item key={URL_UPDATE_PASSWORD}>
                      <Link to={URL_UPDATE_PASSWORD}><UserSwitchOutlined/> 修改密码</Link>
                    </Menu.Item>
                    <Menu.Item key={URL_SYSTEM_DESCRIBE}>
                      <Link to={URL_SYSTEM_DESCRIBE}><FileTextOutlined/> 系统说明</Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="/logout"
                             onClick={() => {
                               confirm({
                                 title: '确认退出系统？',
                                 icon: <LogoutOutlined/>,
                                 okText: "确认",
                                 cancelText: "取消",
                                 onOk() {
                                   PubSub.publish(PS_LOGOUT)
                                 },
                               });
                             }}>
                    <LogoutOutlined/><span className="menuText"> 退出登录</span>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    </div>
  );
});

export default HeadMenuUI;
