import {Card, Modal,Form, Input, Button,Table,DatePicker,InputNumber,Space} from 'antd';
import {Bar} from "@ant-design/charts";
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
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
          <Space direction="horizontal" size={12}>
          <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
          <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button>
          <RangePicker picker="month"></RangePicker>
          <><span style={{marginRight:5}}>Top</span><InputNumber min={1} onChange={onNumberChange} defaultValue={5}></InputNumber><span style={{marginLeft:5}}>Agents</span></>
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
        title={modalEmail}
        visible={modalVisiblibity}
        onCancel={handleCancel}>
            <Card title={"Flights Taken within my airline company"}>
            <Table>

            </Table></Card>

        </Modal>
        
    </Card>)
}