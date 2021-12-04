import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table} from 'antd';
import {dateFormat} from "../../lib/dateFormat";
import axios from "axios";
import moment from "moment";

export default function SpendingChart({loginInfo}) {

    const [spendingData, setSpendingData] = useState([]);
    const [startDate,setStart] = useState(moment().subtract(30, 'days'));
    const [endDate,setEnd] = useState(moment());

    useEffect(()=>{
        axios({
            url:"http://localhost:8080/customer/trackSpending",
            method:"POST",
            data:{startDate:startDate,
                endDate:endDate,
                email:loginInfo.current?loginInfo.current.email:"User"},
        }).then(function(response){
            if(response.data){
            //  const parsedData = JSON.parse(response.data);
            const dataMap = response.data.map((item)=>({type:item.interval,value:item.value}))
            setSpendingData(dataMap);}
        })
    },[])

    const setStartDate = (value)=>{
        setStart(value);
    }

    const setEndDate = (value)=>{
        setEnd(value);
    }

    const handleSubmit=()=>{
        console.log(startDate);
        console.log(endDate);

        
    }

    const handleChange = (value,type)=>{
        let start = 0;
        let end = 0;
        if(type=="start"){
            start = value
            end = endDate;}
            else{
                start = startDate;
                end = value;}
        axios({
            url:"http://localhost:8080/customer/trackSpending",
            method:"POST",
            data:{startDate:start,
                endDate:end,
                email:"12345@qq.com"},
        }).then(function(response){
            if(response.data.length>0){
                console.log(response.data);
            const dataMap = response.data.map((item)=>({type:item.interval,value:item.value}))
            setSpendingData(dataMap);
            if(type=="start"){
            setStartDate(start);}
            else{
            setEndDate(end);}}else{
                setSpendingData([{item:"9",value:9999}])
            }
        })
    }

    const chartConfig = {
        appendPadding: 10,
        data: spendingData, // TODO: use props or ask for the server
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        meta: {
            type: {
                alias: 'Month',
            },
            value: {
                alias: 'Total Spending',
                formatter: (v) => ("$" + v.toString()),
            },
        },
        label: {
            type: 'inner',
            offset: '-30%',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
    }

    return (
        <Card title="See your amazing trips, Username!">
            <Input.Group>

            <DatePicker format={dateFormat} placeholder={"startDate"} defaultValue={startDate} onChange={(value)=>{handleChange(value,"start");}} style={{width:200}} />
            <b style={{padding: 190}}> </b>
            <DatePicker format={dateFormat} placeholder={"endDate"} defaultValue={endDate} onChange={(value)=>{handleChange(value,"end")}} style={{width:200}} />
            <b style={{padding: 160}}> </b>
            </Input.Group>
            <Pie {...chartConfig} />
        </Card>
    )
}