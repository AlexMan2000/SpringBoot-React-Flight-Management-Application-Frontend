import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table} from 'antd';
import {dateFormat} from "../../lib/dateFormat";
import axios from "axios";

export default function SpendingChart() {

    const [spendingData, setSpendingData] = useState(null);

    //for testing ONLY
    const testData = [
        {
            type: 'January',
            value: 2930.8,
        },
        {
            type: 'February',
            value: 1034.2,
        },
        {
            type: 'March',
            value: 3832.9,
        },
        {
            type: 'April',
            value: 1564.0,
        },
        {
            type: 'May',
            value: 3013.6,
        },
        {
            type: 'June',
            value: 4566.2,
        },
    ];


    const handleSearch =()=>{

    }

    const handleSubmit=()=>{
        axios({
            url:"http://",
            method:"POST",
            data:"",
        })
    }

    const chartConfig = {
        appendPadding: 10,
        data: testData, // TODO: use props or ask for the server
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        meta: {
            type: {
                alias: 'Date Range',
            },
            value: {
                alias: 'Total Spending',
                formatter: (v) => ("$" + v.toString()),
            },
        },
        label: {
            type: 'inner',
            offset: '-30%',
        }
    }

    return (
        <Card title="See your amazing trips, Username!">
            <Input.Group>

            <DatePicker format={dateFormat} placeholder={"startDate"}  onChange={handleSearch} style={{width:200}} />
            <b style={{padding: 90}}> </b>
            <DatePicker format={dateFormat} placeholder={"endDate"} onChange={handleSearch} style={{width:200}} />
            <b style={{padding: 90}}> </b>
            <Button type={"primary"} onClick={handleSubmit}>Display</Button>
            </Input.Group>
            <Pie {...chartConfig} />
        </Card>
    )
}