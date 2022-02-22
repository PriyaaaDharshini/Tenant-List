import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import "./styles.scss";

interface User {
  id: string;
  name: string;
  description: string;
  code: string;
  type: string;
  status: string;
}

export default function TenantList() {
  const [data, setDataArray] = useState([]);
  const [loadState, setLoad] = useState(true);

  const setData = () => {
    let url = "https://hungry-skinny-cappelletti.glitch.me/tenants";
    axios.get(url).then((response) => {
      setTimeout(() => {
        setDataArray(response.data);
        setLoad(false);
      }, 2000);
    });
  };
  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {}, [data]);

  return (
    data && (
      <>
        <h1>Tenant List</h1>
        <div>
          <Table<User>
            style={{ margin: "15px" }}
            bordered={true}
            loading={loadState}
            dataSource={data}
            pagination={{
              hideOnSinglePage: true,
              size: "small",
              pageSizeOptions: [20],
              defaultPageSize: 20,
            }}
          >
            <Table.Column<User>
              align="center"
              key="id"
              title="Id"
              dataIndex="id"
            />
            <Table.Column<User>
              align="center"
              key="name"
              title="Name"
              dataIndex="name"
            />
            <Table.Column<User>
              align="center"
              key="description"
              title="Description"
              dataIndex="description"
            />
            <Table.Column<User>
              align="center"
              key="code"
              title="Code"
              dataIndex="code"
            />
            <Table.Column<User>
              align="center"
              key="type"
              title="Type"
              dataIndex="type"
            />
            <Table.Column<User>
              title="Status"
              dataIndex="status"
              align="center"
              key="status"
              render={(tag) => (
                <Tag color={tag === "ACTIVE" ? "green" : "blue"} key={tag}>
                  {tag}
                </Tag>
              )}
            />
          </Table>
        </div>
      </>
    )
  );
}
