import {Card, Modal,Form, Input,Tooltip, Button,Table,DatePicker,InputNumber,Space} from 'antd';
import {Bar} from "@ant-design/charts";
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

const {RangePicker} = DatePicker;

export default function ViewFrequent(){
     // sales 和 commission
     const [activeTab,setActiveTab] = useState("sales");
     const [topK,setTopK] = useState(5);
     const [data,setData]=useState([]);
     const [modalVisiblibity,setModalVisibility] = useState(false);
     const [modalEmail,setModalEmail] = useState("");
     const [tableData,setTableData] = useState([]);

 
     const topSalesData =[
         {
             customer:"22@23.com",
             tickets:2
         },
         {
            customer:"22@25.com",
            tickets:8
         },
         {
            customer:"aa@23.com",
            tickets:3
         },
         {
            customer:"s2a@43.com",
            tickets:12
         },
         {
            customer:"12@23.com",
            tickets:5
         }
     ]


     const tableSampleData = [
         {
             key:"1",
             flight_id:"MA1234",
             airline:"Cathay Pacific",
             dept_time:"2020-03-03",
             arri_time:"2021-01-01",
             price:9090
         },
         {
             key:"2",
             flight_id:"MH3455",
             airline:"Cathay Pacific",
             dept_time:"2020-03-03",
             arri_time:"2021-01-01",
             price:9090
         },
         {
             key:"3",
             flight_id:"MK5888",
             airline:"Cathay Pacific",
             dept_time:"2020-03-03",
             arri_time:"2021-01-01",
             price:9090
         },{
            key:"4",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"5",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"6",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"7",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"8",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"9",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"10",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"11",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        },{
            key:"12",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090
        }
     ]


     const tableColumns = [
        {
            title:"Flight Number",
            dataIndex: "flight_id",
            key:"flight_id"
        },
        {   
            title:"Airline",
            dataIndex:"airline",
            key:"airline"
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
        }
     ]
 
     useEffect(()=>{
         setData(topSalesData);
     },[])
 
     const tabList = [
         {key: 'customer', tab: 'Most Frequent Customers'},
     ]
 
 
     const onNumberChange=(value)=>{
         //更新图标
         setTopK(value);
     }


     const renderLastYear = ()=>{

    }

    const renderLastMonth = ()=>{


    }

    const renderTabExtra = ()=>{


      return (
          <Space direction="horizontal" size={10}>
          <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
          <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button>
          <RangePicker picker="month"></RangePicker>
          <>
          <span style={{marginRight:2}}>Top</span>
            <InputNumber min={1} onChange={onNumberChange} defaultValue={5}></InputNumber>
          <span style={{marginLeft:2}}>Agents</span>
          </>
          <Tooltip placement="topLeft" title="Click the bar to check the flights taken"><QuestionCircleOutlined/></Tooltip>
          </Space>
      )
    }
 
 
     var config = {
         data: data.slice(0,topK),
         xField: "tickets",
         yField: 'customer',
         legend: { position: 'top-left' },
         barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
         interactions: [
           {
             type: 'active-region',
             enable: false,
           },
         ],
        };
       


    // 编写图例点击事件
    const handleClick =(event)=>{
        setTableData(tableSampleData);
        setModalEmail(event.data.data.customer);
        setModalVisibility(true);
        
        // console.log(event);
        // console.log(modalVisiblibity);
    }

    const handleCancel = () => {
        // 推出Modal
        setModalVisibility(false);
    }


    return (<Card tabList={tabList}
        tabBarExtraContent={renderTabExtra()}
        hoverable={true}>
        
        <Bar 
        {...config}
        sort 
        onReady={(plot)=>{
            plot.chart.on("element:click",handleClick
                );
            }}
        />
        <Modal
        destroyOnClose
        title={"Flight details with "+ modalEmail}
        visible={modalVisiblibity}
        onCancel={handleCancel}>
            <Card >
                <Table columns={tableColumns} dataSource={tableData} size={"middle"}>

                </Table>
            </Card>

        </Modal>
        
    </Card>)
}