import {Button, Space, Tag} from "antd";
import {statusColor} from "./statusTag";
import React from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export const ticketColumns = [
    // title是列的名称
    // dataIndex:是后续用于指定<Table>组件columns中的对应关系
    // key就是用于区分所有的列
    {
        title: "Ticket No.",
        dataIndex: "ticket_id",
        key: "ticket"
    },
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
];


export const staffViewFLightColumns = [
    {
        title: "Flight Number",
        dataIndex:"flight_id",
        key:"flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        hideInSearch:true,
        key: "price"
    },
    {
        title: "Status",
        dataIndex: "status",
        hideInSearch:true,
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
    {
        title: "Action",
        key: 'action',
        hideInSearch:true,
        render: (text, record) => (
            <Space size="middle">
            <Button>Details</Button>
            <Button onClick={()=>{console.log("haha");}} type={'primary'} size={'small'} >
              <EditOutlined style={{fontSize: '15px'}} />
            </Button>
            <Button onClick={()=>{console.log("xixi");}} type={'primary'} size={'small'} danger >
              <DeleteOutlined style={{fontSize: '15px'}} />
            </Button>
          </Space>
    
        )
    }
]

export const customerInterfaceColumns = [
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
    {
        title: "Action",
        key: 'action',
        render: (text, record) => (
            <Space size={"middle"}>
                <Button disabled={record.status==("finished"||"onBoarding")} >Book {record.flight_id}</Button>
            </Space>
        )
    }
];

export const agentInterfaceColumns = [
    {
        title: "User ID",
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },  {
        title: "Action",
        key: 'action',
        render: (text, record) => (
            <Space size={"middle"}>
                <Button disabled={record.status==("finished"||"onBoarding")} >Book {record.flight_id}</Button>
            </Space>
        )
    }
]

export const globalInterfaceColumns = [
    {
        title: "Flight No.",
        dataIndex: "flight_id",
        key: "flight"
    },
    {
        title: "Dept. Airport",
        dataIndex: "dept",
        key: "dept"
    },
    {
        title: "Arri. Airport",
        dataIndex: "arri",
        key: "arri"
    },
    {
        title: "Dept. Time",
        dataIndex: "dept_time",
        key: "dept_time"
    },
    {
        title: "Arri. Time",
        dataIndex: "arri_time",
        key: "arri_time"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tags => (
            <>
                {tags.map(status => (
                    <Tag color={statusColor[status]} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                ))
                }
            </>
        )
    },
]


