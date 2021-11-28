import {Card, Form, Input, Button,Table,InputNumber,Space,Spin} from 'antd';
import {Bar} from "@ant-design/charts";
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

// 设置最大等待时间
axios.defaults.timeout = 1000;

export default function ViewAgents(){

    // sales 和 commission
    const [activeTab,setActiveTab] = useState("sales");
    const [past,setPast] = useState("year");
    const [topK,setTopK] = useState(5);
    const [data,setData]=useState(null);

    console.log(past);
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

    useEffect(()=>{handleSearchSales()
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

    const handleSearchSales=()=>{
        axios.get("http://localhost:8080/airlineStaff/getTopK",{
            params:{
                type:"sales",
                K:topK,
                past:past
            },
            timeout:1000
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                const dataMap = response.data.map((item)=>({type:item.email,sales:item.totalSales}));
                setData(dataMap);
            }
        }).catch(function(response){
            setData(topSalesData);
        })
    }

    const handleSearchCommission=()=>{

        axios.get("http://localhost:8080/airlineStaff/getTopK",{
            params:{
                type:"commission",
                K:topK,
                past:past
            }
        }).then(function(response){
            if(response.data){
                const dataMap = response.data.map((item)=>({type:item.email,commission:item.commissionFees}));
                console.log(dataMap);
                setData(dataMap);
            }
        }).catch(function(response){
            setData(topCommissionData);
        })

    }

    const onTabChange = (key)=>{
        setActiveTab(key);
    
        if(key==="sales"){
            // setData(topSalesData);
            setData(null);
            handleSearchSales();
        }else{
            // setData(topCommissionData);
            setData(null);
            handleSearchCommission();
        }
    }

    const onNumberChange=(value)=>{
        //更新图标
        setTopK(value);
    }


    var config = {
        data: data?data.slice(0,topK):null,
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
        tabBarExtraContent={<>
        {activeTab==="sales"&&(<Space ><Button type={"primary"} onClick={()=>{setPast("month")}}>Past Month</Button>
        <Button  type={"primary"} onClick={()=>{setPast("year")}}>Past Year</Button></Space>)}
        <Space><span style={{marginRight:5,marginLeft:10}}>Top</span><InputNumber addonBefore="+" addonAfter="$" min={1} onChange={onNumberChange} defaultValue={5}></InputNumber><span style={{marginLeft:5}}>Agents</span></Space>
        </>}
        hoverable={true}>

        {!data&&(<Spin size="large"></Spin>)}
        {data&&(<Bar 
        {...config}
        sort 
        onReady={(plot)=>{
                plot.chart.on("element:click",(evt)=>{
                });
            }}
        />)}



    </Card>)
}