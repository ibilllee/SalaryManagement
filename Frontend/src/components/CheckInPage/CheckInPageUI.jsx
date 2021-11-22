import SalaryTable from "../SalaryTable/SalaryTable";
import {Button, Steps, Result, Upload, Row, Col, Spin, List, BackTop} from "antd";
import React from "react";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {MONTHLY_SALARY, NORMAL_SALARY} from "../../constant";
import Modal from "antd/es/modal/Modal";

const antIcon = <LoadingOutlined style={{fontSize: 40}} spin/>;
const {Step} = Steps;

const CheckInPageUI = (props) => {
  const {
    modalTableType,
    uploadFile,
    isUploadSalarySuccess,
    uploadSalaryMsg,
    isModalVisible,
    isVerifying,
    isLegal,
    illegalMsg,
    current,
    windowWidth,
  } = props.state;
  const {firstPage, nextPage, prevPage, checkSalary, uploadSalary, chooseSalaryType, readExcel} = props.father;
  const displayStepText = windowWidth > 700;
  const salaryTypeBtnWidth = windowWidth > 500 ? '180px' : '120px';
  const salaryTypeBtnHeight = windowWidth > 500 ? '180px' : '120px';
  const salaryTypeBtnFontSize = windowWidth > 500 ? '30px' : '18px';
  const steps = [
    {
      title: displayStepText ? '选择工资类型' : '',
      content: (
        <div>
          <div style={{paddingTop: '100px'}}>
            <Row>
              <Col flex="1"/>
              <Col flex="1">
                <Button shape="round" type="primary" size='large'
                        style={{width: salaryTypeBtnWidth, height: salaryTypeBtnHeight}}
                        onClick={() => {
                          chooseSalaryType(MONTHLY_SALARY);
                        }}>
                  <div style={{fontSize: salaryTypeBtnFontSize}}>
                    月度工资
                  </div>
                </Button>
              </Col>
              <Col flex="1"/>
              <Col flex="1">
                <Button className="salaryTypeBtn" danger shape="round" type="primary" size='large'
                        style={{width: salaryTypeBtnWidth, height: salaryTypeBtnHeight}}
                        onClick={() => {
                          chooseSalaryType(NORMAL_SALARY);
                        }}>
                  <div style={{fontSize: salaryTypeBtnFontSize}}>
                    其他工资
                  </div>
                </Button>
              </Col>
              <Col flex="1"/>
            </Row>

          </div>
        </div>),
    },
    {
      title: displayStepText ? '读取工资表' : '',
      content: (
        <div>
          <div style={{textAlign: 'center', paddingTop: '100px', width: '350px', margin: '0px auto'}}>
            <Upload
              accept=".xls,.xlsx"
              maxCount={1}
              beforeUpload={(file) => {
                props.setState({uploadFile: file})
                readExcel(file, modalTableType);
                return false;
              }}
              onRemove={() => {
                props.setState({uploadFile: {}})
              }}
            >
              <Button
                danger={modalTableType === NORMAL_SALARY}
                type="primary" shape="round" icon={<UploadOutlined/>} size='large' style={{height: '75px'}}>
                选择本地工资表
              </Button>
            </Upload>
            <div style={{marginTop: '50px'}}>
              <Button size="large"
                      style={{marginRight: '50px'}} onClick={() => {
                prevPage();
              }}>
                返回上一步
              </Button>
              <Button size="large"
                      disabled={uploadFile.name === undefined}
                      danger={modalTableType === NORMAL_SALARY}
                      type="primary" onClick={() => {
                nextPage();
                checkSalary()
              }}>
                确认工资表
              </Button>
            </div>
          </div>

        </div>),
    },
    {
      title: displayStepText ? '预览工资表' : '',
      content: (
        <div style={{marginTop: '20px'}}>
          <SalaryTable displayIdNumber={true} displaySelector={false} dataSrc="local" defaultPageSize={100}/>
          <div style={{textAlign: 'center'}}>
            <div style={{marginTop: '50px'}}>
              <Button style={{marginRight: '50px'}} onClick={prevPage} size="large">
                返回上一步
              </Button>
              <Button
                danger={modalTableType === NORMAL_SALARY}
                type="primary" onClick={() => {
                uploadSalary()
              }} size="large">

                确认上传
              </Button>
            </div>
          </div>
        </div>),
    },
    {
      title: displayStepText ? '完成' : '',
      content: (
        <Result
          style={{marginTop: '3%'}}
          status={isUploadSalarySuccess ? "success" : "error"}
          title="工资表录入成功！"
          subTitle={uploadSalaryMsg}
          extra={[
            <Button type="primary" danger={modalTableType === NORMAL_SALARY}
                    key="console" size="large" style={{marginRight: '20px'}}>
              <Link to="/main">返回主页</Link></Button>,
            <Button key="buy" size="large" onClick={() => {
              firstPage();
            }}>再次录入</Button>,
          ]}
        />
      )
    },
  ];

  return (
    <div>
      <BackTop />
      <div style={{backgroundColor: 'white', minHeight: '100%'}}>
        <div style={{padding: '30px', minHeight: '550px'}}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title}/>
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action" style={{textAlign: 'center', marginBottom: '50px'}}/>
        </div>
      </div>
      <Modal title="信息确认" visible={isModalVisible} footer={null} closable={true}
             onCancel={() => {
               props.setState({isModalVisible: false})
             }}>
        <div style={{textAlign: "center"}} hidden={!isVerifying}>
          <Spin indicator={antIcon}/>
          <div style={{marginTop: '30px', fontSize: '16px'}}>正在验证数据</div>
        </div>
        <div style={{textAlign: "center"}} hidden={!isLegal || isVerifying}>
          <Result
            status="success"
            title="数据校验正常！"
            subTitle="请继续后续操作"
            extra={[
              <Button type="primary" onClick={() => {
                props.setState({isModalVisible: false})
              }}>
                好的
              </Button>
            ]}
          />
        </div>
        <div style={{textAlign: "center"}} hidden={isLegal || isVerifying}>
          <Result
            status="warning"
            title="数据校验异常！"
            extra={[
              <div>
                <div style={{textAlign: 'left'}}>
                  <List
                    header={<div>报错信息</div>}
                    footer={null}
                    bordered
                    dataSource={illegalMsg}
                    rowKey='_id'
                    renderItem={item => (
                      <div>
                        <List.Item.Meta
                          title={<div style={{
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginTop: '5px'
                          }}>{item.split(":")[0]}</div>}
                          description={<div style={{
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginBottom: '5px'
                          }}>{item.split(":")[1]}</div>}
                        />
                      </div>
                    )}
                  />
                </div>
                <Button type="primary" style={{marginTop: '20px'}} onClick={() => {
                  props.setState({isModalVisible: false})
                }}>
                  知道了
                </Button>
              </div>
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CheckInPageUI;