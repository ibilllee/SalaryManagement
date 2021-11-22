import { Table, Tag } from "antd";
import {MONTHLY_SALARY} from "../../../constant";

const columnsMonthly = [
  {
    title: "应发项目",
    dataIndex: "paid",
  },
  {
    title: "金额(元)",
    dataIndex: "paidPrice",
  },
  {
    title: "应扣项目",
    dataIndex: "deduct",
  },
  {
    title: "金额(元)",
    dataIndex: "deductPrice",
  },
];

const columnsNormal = [
  {
    title: "项目",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
];

const DetailedSalaryTableUI = (props) => {
  return (
    <div>
      <Table
        columns={
          props.modalTableType === MONTHLY_SALARY ? columnsMonthly : columnsNormal
        }
        dataSource={props.detailedSalaryList}
        pagination={false}
        bordered
        size="small"
        summary={(pageData) => {
          if (props.modalTableType === MONTHLY_SALARY) {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell align="center" colSpan={2}>
                    <Tag color="geekblue" style={{ fontSize: "14px" }}>
                      应发合计 : {props.summarySalary.sPaid}
                    </Tag>
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell>
                  <span style={{ fontWeight: "bold" }}>{props.summarySalary.sPaid}</span>
                </Table.Summary.Cell> */}
                  <Table.Summary.Cell align="center" colSpan={2}>
                    <Tag color="geekblue" style={{ fontSize: "14px" }}>
                      应扣合计 : {props.summarySalary.sDeduct}
                    </Tag>
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell>
                  <span style={{ fontWeight: "bold" }}>{props.summarySalary.sDeduct}</span>
                </Table.Summary.Cell> */}
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell align="center" colSpan={4}>
                    <Tag color="red" style={{ fontSize: "14px" }}>
                      实发 : {props.summarySalary.rPaid}
                    </Tag>
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell colSpan={3}>
                  <span style={{ fontWeight: "bold" }}></span>
                </Table.Summary.Cell> */}
                </Table.Summary.Row>
              </>
            );
          }
        }}
      />

      <br />
    </div>
  );
};

export default DetailedSalaryTableUI;
