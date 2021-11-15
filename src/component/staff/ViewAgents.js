import {Card, Form, Input, Button,Table,InputNumber} from 'antd';
import {Bar} from "@ant-design/charts";
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

export default function ViewAgents(){

    // sales 和 commission
    const [activeTab,setActiveTab] = useState("sales");
    const [topK,setTopK] = useState(5);
    const [data,setData]=useState([]);

    const topSalesData =[
        {
            type:"22@23.com",
            sales:34
        },
        {
            type:"22@25.com",
            sales:38
        },
        {
            type:"aa@23.com",
            sales:30
        },
        {
            type:"s2a@43.com",
            sales:12
        },
        {
            type:"12@23.com",
            sales:56
        }
    ]

    useEffect(()=>{
        setData(topSalesData);
    },[])

    const topCommissionData=[
        {
            type:"22@23.com",
            commission:340
        },
        {
            type:"22@25.com",
            commission:380
        },
        {
            type:"aa@23.com",
            commission:100
        },
        {
            type:"s2a@43.com",
            commission:120
        },
        {
            type:"12@23.com",
            commission:560
        }
    ];

    const tabList = [
        {key: 'sales', tab: 'Sales Ranking'},
        {key: 'commission', tab: 'Commission Ranking'},
    ]

    const onTabChange = (key)=>{
        console.log("tab change");
        setActiveTab(key);
        if(key==="sales"){
            setData(topSalesData);
        }else{
            console.log(key);
            console.log("top commission");
            setData(topCommissionData);
        }
    }

    const onNumberChange=(value)=>{
        //更新图标
        setTopK(value);
    }


    var config = {
        data: data.slice(0,topK),
        xField: activeTab==="sales"?'sales':"commission",
        yField: 'type',
        legend: { position: 'top-left' },
        barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
        interactions: [
          {
            type: 'active-region',
            enable: false,
          },
        ],
      };
     

    return (
    <Card tabList={tabList}
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabBarExtraContent={<><span style={{marginRight:5}}>Top</span><InputNumber addonBefore="+" addonAfter="$" min={1} onChange={onNumberChange} defaultValue={5}></InputNumber><span style={{marginLeft:5}}>Agents</span></>}
        hoverable={true}>


        
        <Bar {...config} sort/>;



    </Card>)
}