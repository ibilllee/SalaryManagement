import React from "react";
import "./SalaryTableUI.css";
import {Table, Button, Modal, Popconfirm, Skeleton, Row, Col} from "antd";
import DetailedSalaryTable from "./DetailedSalaryTable/DetailedSalaryTable";

const SalaryTableUI = (props) => {
    return (
      <div>
        <div style={{textAlign: 'right', paddingBottom: '10px', display: props.totalDisplayName ? "block" : "none"}}>
          姓名：{props.name}
        </div>
        <div style={{backgroundColor: 'white', padding: '30px', display: props.isFetching ? 'block' : 'none'}}>
          <Skeleton active/>
        </div>
        <div style={{display: props.isFetching ? 'none' : 'block'}}>

          <Table
            rowSelection={props.displaySelector ? props.rowSelection : false}
            columns={props.salaryTableColumns}
            dataSource={props.salaryList}
            pagination={{...props.pagination, showQuickJumper: true, showSizeChanger: true}}
            loading={props.loading}
            onChange={props.handleTableChange}
            scroll={{x: true}}
            footer={props.displaySelector ? () => {
              return (
                <Popconfirm title="确认删除所选项？" okText="确认" cancelText="取消" onConfirm={() => {
                  props.deleteSalary();
                }}>
                  <Button>删除所选</Button>
                </Popconfirm>
              )
            } : undefined
            }
          />
        </div>


        <Modal
          title={
            <div>工资详细
              <Row style={{fontSize: '14px', color: '#666666',marginTop:'5px'}}>
                姓名：{props.salaryName}
                <Col style={{width:'20px'}}/>
                工资流水号：{props.salaryId}
              </Row>
            </div>}
          visible={props.isModelVisible}
          okText="关闭"
          cancelButtonProps={"danger"}
          style={{top: 20}}
          onCancel={() => {
            props.setIsModelVisible(false);
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                props.setIsModelVisible(false);
              }}
            >
              关闭
            </Button>,
          ]}
        >
          <DetailedSalaryTable/>
        </Modal>
      </div>
    );
  }
;

export default SalaryTableUI;
