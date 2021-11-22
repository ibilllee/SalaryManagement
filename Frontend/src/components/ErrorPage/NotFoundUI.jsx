import {Button, Result} from "antd";
import {BankOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {URL_MAIN} from "../../constant";

const NotFoundUI = (props) => {
  return (
    <div>
      <Result
        status="404"
        title="出错了！(404)"
        subTitle="找不到页面"
        extra={<Link to={URL_MAIN}><Button type="primary" size="large" icon={<BankOutlined/>}>
          返回主页</Button></Link>}
      />
    </div>
  )
};

export default NotFoundUI;