import React, {useState} from "react";
import {Card, Table, Tag, Space} from "antd";
import {statusColor} from "../../lib/statusTag";
import {ticketColumns} from "../../lib/flightData";

export default function ViewFlights(props) { //view my flights

    let columns = ticketColumns
    if (props.columns) {columns = props.columns;}

    console.log(props);
    console.log(columns);
    //for testing ONLY
    const data = [
        {
            key: '1',
            uid: "123",
            ticket_id: "TK2021110600001",
            flight_id: "MU682",
            dept: "PVG",
            arri: "JFK",
            dept_time: "2021-11-06 08:00",
            arri_time: "2021-11-06 21:00",
            status: ['upcoming']
        },
        {
            key: '2',
            uid: "123",
            ticket_id: "TK2021110400001",
            flight_id: "MU681",
            dept: "JFK",
            arri: "PVG",
            dept_time: "2021-11-04 08:00",
            arri_time: "2021-11-04 21:00",
            status: ['finished']
        }
    ]

    return (
        <Card title="Welcome, Username!">
            <Table columns={columns} dataSource={data} />
        </Card>
    )
}