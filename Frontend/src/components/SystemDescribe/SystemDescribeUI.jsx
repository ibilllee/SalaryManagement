import {Tag, Timeline} from "antd";
import { SESSION_USER_TYPE, USER} from "../../constant";

const SystemDescribeUI = (props) => {
  const content = () => {
    return sessionStorage.getItem(SESSION_USER_TYPE) === USER ? (
        <div style={{paddingLeft: "50px", paddingRight: "50px", width: "100%"}}>
          <Tag color="blue" style={{width: '125px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
            <div style={{margin: "4px auto", fontSize: '16px'}}>工资管理功能</div>
          </Tag>
          <Timeline>
            <Timeline.Item>主页中可查看本人的工资信息，以工资流水号倒序排序，可点击右侧<span
              style={{fontWeight: 'bold'}}>查看</span>查看详细信息</Timeline.Item>
          </Timeline>

          <Tag color="blue" style={{width: '125px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
            <div style={{margin: "4px auto", fontSize: '16px'}}>账号管理功能</div>
          </Tag>
          <Timeline>
            <Timeline.Item>点击菜单中<span style={{fontWeight: 'bold'}}>用户中心 > 修改密码</span>，可根据指引修改账号密码</Timeline.Item>
            <Timeline.Item>若忘记密码，请联系管理员将密码恢复成<span style={{fontWeight: 'bold'}}>身份证的后六位</span>。
              为隐私安全，请在初始化密码后及时修改密码</Timeline.Item>
          </Timeline>

          <Tag color="red" style={{width: '100px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
            <div style={{margin: "4px auto", fontSize: '16px'}}>注意事项</div>
          </Tag>
          <Timeline>
            <Timeline.Item color="red">退出系统时，请及时点击右上角<span
              style={{fontWeight: 'bold'}}>退出登录</span>，以保证隐私安全</Timeline.Item>
          </Timeline>
        </div>
      )
      :
      (<div style={{paddingLeft: "50px", paddingRight: "50px", width: "100%"}}>
        <Tag color="blue" style={{width: '125px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
          <div style={{margin: "4px auto", fontSize: '16px'}}>工资查询功能</div>
        </Tag>
        <Timeline>
          <Timeline.Item>管理员可以对已上传的工资信息进行<span
            style={{fontWeight: 'bold'}}>关键字查询，查看工资详情，删除工资信息</span>的操作</Timeline.Item>
        </Timeline>

        <Tag color="blue" style={{width: '125px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
          <div style={{margin: "4px auto", fontSize: '16px'}}>工资录入功能</div>
        </Tag>
        <Timeline>
          <Timeline.Item>点击菜单中<span style={{fontWeight: 'bold'}}>系统操作 > 工资录入</span></Timeline.Item>
          <Timeline.Item>选择<span style={{fontWeight: 'bold'}}>月度工资</span>或<span style={{fontWeight: 'bold'}}>其他工资</span>，其中<span
            style={{fontWeight: 'bold'}}>月度工资</span>需要有<span style={{fontWeight: 'bold'}}>"应发合计"，"应扣合计"，"实发"</span>三个字段，<span
            style={{fontWeight: 'bold'}}>其他工资</span>以表头顺序依次录入</Timeline.Item>
          <Timeline.Item>选择本地工资表进行上传，点击<span style={{fontWeight: 'bold'}}>确认工资表</span>进行下一步</Timeline.Item>
          <Timeline.Item>系统解析文件并校验数据（工资表的每条数据对应的身份证号是否存在系统中、数据中身份证对应的姓名与系统中身份证对应的姓名是否一致），校验完成后将有提示，若数据异常请根据信息提示进行检查。</Timeline.Item>
          <Timeline.Item>预览展示的工资表，确认无误后点击<span style={{fontWeight: 'bold'}}>确认上传</span>后，系统将正式录入工资信息</Timeline.Item>
        </Timeline>

        <Tag color="blue" style={{width: '125px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
          <div style={{margin: "4px auto", fontSize: '16px'}}>员工账号管理</div>
        </Tag>
        <Timeline>
          <Timeline.Item>点击菜单中<span style={{fontWeight: 'bold'}}>系统操作 > 员工账号管理</span></Timeline.Item>
          <Timeline.Item>点击页底<span style={{fontWeight: 'bold'}}>新增用户</span>可添加新用户</Timeline.Item>
          <Timeline.Item>对每一条账号，可以点击<span style={{fontWeight: 'bold'}}>恢复密码</span>以将密码重置为身份证后6位；
            点击<span style={{fontWeight: 'bold'}}>删除账号</span>可以删除员工账号</Timeline.Item>
          <Timeline.Item>点击菜单中<span style={{fontWeight: 'bold'}}>系统操作 > 工资录入</span></Timeline.Item>
        </Timeline>

        <Tag color="blue" style={{width: '130px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
          <div style={{margin: "4px auto", fontSize: '16px'}}>管理员账号管理</div>
        </Tag>
        <Timeline>
          <Timeline.Item>点击菜单中<span style={{fontWeight: 'bold'}}>用户中心 > 修改密码</span>，可根据指引修改账号密码</Timeline.Item>
        </Timeline>

        <Tag color="red" style={{width: '100px', height: '30px', textAlign: 'center', margin: '0px 0px 15px 0px'}}>
          <div style={{margin: "4px auto", fontSize: '16px'}}>注意事项</div>
        </Tag>
        <Timeline>
          <Timeline.Item color="red">退出系统时，请及时点击右上角<span
            style={{fontWeight: 'bold'}}>退出登录</span>，以保证隐私安全</Timeline.Item>
        </Timeline>
      </div>)
  }

  return (
    <div style={{backgroundColor: "white"}}>
      <div style={{margin: "20px auto", padding: "0px 15px 0px 15px", width: "300px"}}>
        <h1 style={{textAlign: 'center', paddingTop: '20px'}}>系统说明</h1>
      </div>
      {content()}
    </div>
  );
};

export default SystemDescribeUI;
