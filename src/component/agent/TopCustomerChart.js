import React, {useState} from "react";
import {Column} from "@ant-design/charts";
import {Card, Divider, Typography} from "antd";

const {Title} = Typography;

export default function TopCustomerChart() {
    const [customerTicketCount, setCustomerTicketCount] = useState(null);
    const [customerCommission, setCustomerCommission] = useState(null);

    // for testing ONLY
    const testTicket = [
        {
            uid: "123",
            sum: 15,
        },
        {
            uid: "234",
            sum: 11,
        },
        {
            uid: "471",
            sum: 9,
        },
        {
            uid: "602",
            sum: 7,
        },
        {
            uid: "866",
            sum: 5,
        },
    ];
    const testCommission = [
        {
            uid: "123",
            sum: 9806.3,
        },
        {
            uid: "234",
            sum: 7503.5,
        },
        {
            uid: "471",
            sum: 6602.6,
        },
        {
            uid: "602",
            sum: 1025.2,
        },
        {
            uid: "866",
            sum: 897.8,
        },
    ]

    const columnConfig = {
        xField: 'uid',
        yField: 'sum',
        seriesField: '',
        columnWidthRatio: 0.5,
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.8
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            }
        },
    }

    return (
        <Card title="Customer Statistics">
            <Title level={4}>Top 5 customers of ticket number</Title>
            <Column {...columnConfig}
                    data={testTicket}
                    meta={{uid: {alias: 'User ID'}, sum: {alias: 'Ticket Number'}}} />
            <Divider />
            <Title level={4}>Top 5 customers of total commission</Title>
            <Column {...columnConfig}
                    data={testCommission}
                    meta={{uid: {alias: 'User ID'}, sum: {alias: 'Total Commission'}}} />
        </Card>
    )
}