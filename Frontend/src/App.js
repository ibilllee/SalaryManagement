import "./App.less";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import {Switch} from "react-router-dom";
import MyRoute from "./utils/MyRoute";
import {ConfigProvider} from "antd";
import LoginByWx from "./components/LoginByWx/LoginByWx";

function App() {
  return (

    <div className="App">
      <ConfigProvider>
        <Switch>
          <MyRoute exact path="/login" needLogin={false} component={LoginPage}/>
          <MyRoute exact path="/loginByWxSuccess" needLogin={false} component={LoginByWx}/>
          <MyRoute path="/" component={MainPage}/>
        </Switch>
      </ConfigProvider>
    </div>
  );
}

export default App;
