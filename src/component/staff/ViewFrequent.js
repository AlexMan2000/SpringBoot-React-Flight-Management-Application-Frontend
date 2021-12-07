import {Card, Modal,Form, Input,Tooltip, Button,Table,DatePicker,InputNumber,Space,Spin,message,Tag} from 'antd';
import {Bar} from "@ant-design/charts";
import React, {useState,useEffect,useRef} from "react";
import {LockOutlined, UserOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { SettingOutlined } from '@ant-design/icons';
import {statusColor} from "../../lib/statusTag";

// 设置最大等待时间
axios.defaults.timeout = 1000;
const {RangePicker} = DatePicker;

export default function ViewFrequent({loginInfo}){
     // sales 和 commission
     const [activeTab,setActiveTab] = useState("sales");
     const [topK,setTopK] = useState(10);
     const [data,setData]=useState([]);
     const originData = useRef(null);
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
             price:9090,
             dept:"PVG",
             arri:"SZX",
             status:["on time"]
         },
         {
             key:"2",
             flight_id:"MH3455",
             airline:"Cathay Pacific",
             dept_time:"2020-03-03",
             arri_time:"2021-01-01",
             price:9090,
             dept:"PVG",
             arri:"SZX",
             status:["on time"]
         },
         {
             key:"3",
             flight_id:"MK5888",
             airline:"Cathay Pacific",
             dept_time:"2020-03-03",
             arri_time:"2021-01-01",
             price:9090,
             dept:"PVG",
             arri:"SZX",
             status:["on time"]
         },{
            key:"4",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"5",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"6",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"7",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"8",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"9",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"10",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"11",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
        },{
            key:"12",
            flight_id:"MK5888",
            airline:"Cathay Pacific",
            dept_time:"2020-03-03",
            arri_time:"2021-01-01",
            price:9090,
            dept:"PVG",
             arri:"SZX",
             status:["on time"]
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
            title: "Dept. Airport",
            dataIndex:"dept",
            key:"dept"

        },
        {
            title: "Arri. Airport",
            dataIndex:"arri",
            key:"arri"
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
        }
     ]
 
     useEffect(()=>{
        //  setData(topSalesData);
        getCustomerData(topK);
     },[])
 
     const tabList = [
         {key: 'customer', tab: 'Most Frequent Customers'},
     ]
 
 
     const onNumberChange=(value)=>{
         //更新图标
         setTopK(value);
         if(value>topK){
         getCustomerData(value);}
     }

     const getCustomerData = (value)=>{
        axios.get("http://localhost:8080/airlineStaff/getTopKCustomers",
        {
            params:{
                K:value,
                airlineName:loginInfo.current?loginInfo.current.airlineName:null
            },
            }).then(function(response){
                if(response.data){
                    originData.current = response.data;
                    const dataMap = processData();
                    console.log(dataMap);
                    message.destroy();
                    message.success("Data Loaded!");
                    setData(dataMap);
                }
        }).catch(function(response){
            setData(topSalesData);
            setTableData(tableSampleData);
            message.destroy();
            message.error("Data Loading Failed!");
        })
     }

     const processTableData = (email)=>{
         console.log("haha");
         if(originData.current===null){
             return tableSampleData;
         }
        const tableData = originData.current.filter((item)=>item.email===email)[0];
        if(tableData.length==0){
            return []
        }else{
            const takenFlights = tableData.takenFlights;
            
        const tableDataMap = takenFlights.map((item)=>{
            return ({
                key:[item.flightNum,item.airlineName],
                flight_id:item.flightNum,
                airline:item.airlineName,
                dept_time:moment(item.departureTime).format("yyyy-MM-DD HH:mm:ss"),
                arri_time:moment(item.arrivalTime).format("yyyy-MM-DD HH:mm:ss"),
                dept:item.sourceAirportName,
                arri:item.destAirportName,
                price:item.price,
                status:[item.status]
            })
        }
        )
        return tableDataMap;
    }
        
     }

     const processData = (value,past)=>{
        const dataMap = originData.current.map((item)=>{
                return {customer:item.email,tickets:item.ticketsTotal}
            
        }
            )
        return dataMap;
     }


    const renderTabExtra = ()=>{


      return (
          <Space direction="horizontal" size={10}>
          {/* <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
          <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button> */}
          {/* <RangePicker picker="day" onChange={handleChangeTime}></RangePicker> */}
          <>
          <span style={{marginRight:2}}>Top</span>
            <InputNumber min={1} onChange={onNumberChange} defaultValue={5}></InputNumber>
          <span style={{marginLeft:2}}>Customers</span>
          </>
          <Tooltip color={"orange"} placement="topLeft" title="Click the bar to check the flights taken"><QuestionCircleOutlined/></Tooltip>
          </Space>
      )
    }
 
 
     var config = {
         data: data?data.slice(0,topK):[],
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
         meta:{
             type:{
                 alias: 'Customer Email'
             },
             tickets:{
                 alias: 'Number of Tickets Bought'
             }
         }
        };
       


    // 编写图例点击事件
    const handleClick =(event)=>{
        const tableDataMap = processTableData(event.data.data.customer);
        setTableData(tableDataMap);
        setModalEmail(event.data.data.customer);
        setModalVisibility(true);

    }

    const handleCancel = () => {
        // 推出Modal
        setModalVisibility(false);
    }


    return (<Card tabList={tabList}
        tabBarExtraContent={renderTabExtra()}
        hoverable={true}>
        
        {!data&&(<Spin size={"large"}></Spin>)}
        {data&&(<><Bar 
        {...config}
        sort 
        onReady={(plot)=>{
            plot.chart.on("element:click",handleClick
                );
            }}
        />
        <Modal
        destroyOnClose
        title={"Flight Taken with "+ modalEmail}
        visible={modalVisiblibity}
        onCancel={handleCancel}
        width={900}>
            <Card >
                <Table columns={tableColumns} dataSource={tableData} size={"middle"}>

                </Table>
            </Card>

        </Modal></>)}
        
    </Card>)
}