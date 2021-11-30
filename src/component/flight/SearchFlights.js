import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table,Modal} from 'antd';
import React, {useState,useEffect} from "react";
import {SwapOutlined} from "@ant-design/icons";
import {statusColor} from "../../lib/statusTag";
import {dateFormat} from "../../lib/dateFormat";
import {globalInterfaceColumns, ticketColumns} from "../../lib/flightData";
import CustomerModal from "./PurchaseModals/CustomerModal";
import AgentModal from "./PurchaseModals/AgentModal";
import axios from "axios";
import moment from "moment";
import qs from "qs";
import {v4 as uuidv4} from "uuid";

const {Search} = Input;
const {Option} = Select;

export function FlightsResultTable(props) 
{
    const {data,userType,actionType,setRowRecord,setCustomerModalVis,setAgentModalVis} = props;
    const {RangePicker} = DatePicker;

    const agentInterfaceColumns = [
        {
            title:"Ticket Id",
            dataIndex:"ticket_id",
            key:"ticket"
        },
        {
            title: "Flight No.",
            dataIndex: "flight_id",
            key: "flight"
        },
        {   
            title:"Airline Name",
            dataIndex:"airline",
            key:"airline"
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
            title: "Customer Email",
            dataIndex: "customerEmail",
            key: "customerEmail"
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
                    <Button disabled={(record.status==("cancelled"||"checking in"))||record.full===true} onClick={()=>{
                        
                        setAgentModalVis(true);
                        setRowRecord(record);
                        
                        }} >Book {record.flight_id}</Button>
                </Space>
            )
        }
    ]

    const customerInterfaceColumns = [
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
                    <Button disabled={record.status==("cancelled"||"checking in")} 
                    onClick={()=>{
                        
                        setCustomerModalVis(true);
                        setRowRecord(record);
                        
                        }}>Book {record.flight_id}</Button>
                </Space>
            )
        }
    ];

    const defaultColumns = [
        {
            title: "Flight No.",
            dataIndex: "flight_id",
            key: "flight"
        },
        {   
            title:"Airline Name",
            dataIndex:"airline",
            key:"airline"
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
        }
    ]
    

    let columns = userType==="customer"? customerInterfaceColumns:userType==="agent"?agentInterfaceColumns:globalInterfaceColumns;
    let dataMap = data;
    if(actionType!=="view"){
     dataMap = data.map(item=>{
        return({key:[item.airlineName,item.flightNum],
        flight_id:item.flightNum,
        airline:item.airlineName,
        dept:item.sourceAirportName,
        arri:item.destAirportName,
        dept_time:item.departureTime,
        arri_time:item.arrivalTime,
        price:item.price,
        status:[item.status]
        })
    })}else if(actionType==="view"){
        console.log(data);
         dataMap = data.map(item=>{
            return({
                key:item.ticketId,
                ticket_id:item.ticketId,
                flight_id:item.flightNum,
                airline:item.airlineName,
                dept:item.sourceAirportName,
                arri:item.destAirportName,
                dept_time:item.departureTime,
                arri_time:item.arrivalTime,
                price:item.price,
                customerEmail:item.customerEmail,
                status:[item.status]
            })
        })
    }

    console.log(dataMap);
    if(actionType!=="view"){
        columns = columns.filter((item)=>(item.title!="Ticket Id")&&(item.title!=="Customer Email"));
    }
    //根据actionTab 过滤展示的列
    if(actionType!=="purchase"){
        columns = columns.filter((item)=>item.title!="Action")
    }

    if(actionType==="search"){
        columns = columns.filter((item)=>item.title!="User ID");
    }
    return (
        <Table columns={columns} dataSource={dataMap} size="middle"/>
    )
}

export default function SearchFlights({userType,actionTab,flightsResult,setFlightResult,actionType}) {

    const {RangePicker} = DatePicker;

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today
    const [deptDate2,setDeptDate2] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    // const [flightsResult, setFlightResult] = useState(null);
    const [flightID, setFlightID] = useState(undefined);
    // 设置点击购买按钮后的数据
    const [rowRecord,setRowRecord] = useState(undefined);

    // 设置模态对话框用于提交购买信息
    const [agentModalVis,setAgentModalVis] = useState(false);
    const [customerModalVis,setCustomerModalVis] = useState(false);


    

    const searchAirport=()=>{
        axios({
            url:"http://localhost:8080/index/searchAirports",
            type:"GET",
        }).then(function(response){
            if(response.data){
                setSearchResult(response.data);
            }else{
                console.log("No Results");
            }
        })
    };

    const options = searchResult.map(item => <Option key={item}>{item}</Option>);

    const handleSearch = (value) => {
        if (value) {
            setTimeout(searchAirport, 500);
        } else {
            setSearchResult([]);
        }
    }

    //callback就是传入的回调函数，value就是一个参数为value的，调用了callback的函数
    const handleChange = (callBack) => (value) => {
        callBack(value);
    }

    const swapDeptArri = () => {
        let tmp = deptAirport;
        setDeptAirport(arriAirport);
        setArriAirport(tmp);
    }

    const handleSearchFlights = () => {
        // search flights
        console.log("xixi");
        axios({
            url:"http://localhost:8080/index/searchFlights",
            method:"POST",
            data: {sourceAirportName:deptAirport,
                destAirportName:arriAirport,
                departureTime:deptDate}
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                setFlightResult(response.data);
            }else{
                console.log("No Results");
            }
        }).catch(function(response){
            console.log("haha");
        })

    }

    const handleSearchPurchase = () => {
        console.log("xixi");
        axios({
            url:"http://localhost:8080/bookingAgent/getAllAvailableFlights",
            method:"POST",
            data: {}
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                setFlightResult(response.data);
            }else{
                console.log("No Results");
            }
        })

    }

    const handleExactSearch = () => {
        setFlightResult("testing");
    }


    // 处理和ViewFlights相关的请求
    const handleViewFlights = ()=>{
        let sendObject = null;
        console.log("xixi");
        if(deptDate===""&&deptDate2===""){
            sendObject = qs.stringify({
                sourceAirport:deptAirport,
                destAirport:arriAirport,
                email:"abababababa@gmail.com",
            })
        }else{
            sendObject= qs.stringify({
                sourceAirport:deptAirport,
                destAirport:arriAirport,
                email:"abababababa@gmail.com",
                startDate:new Date(deptDate),
                endDate:new Date(deptDate2)
            })
        }
        axios({
            url:userType==="customer"?"http://localhost:8080/customer/getMyFlights":"http://localhost:8080/bookingAgent/getMyFlights",
            method:"POST",
            header:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:sendObject
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                setFlightResult(response.data);
            }else{
            }
        }).catch(function(response){
            console.log("出错了");
        })
    }

    return (
        <Card title={actionTab!=="view"?"Start planning your journey, Username!":"Welcome you"}>
            <Input.Group>
                <b>From:</b>
                <Select
                    showSearch
                    addonBefore="From"
                    style={{width: 300, padding: 10}}
                    placeholder={"Departure Airport"}
                    value={deptAirport}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange(setDeptAirport)}
                    notFoundContent={null}
                    allowClear
                >
                    {options}
                </Select>
                <Button shape="circle" icon={<SwapOutlined />} onClick={swapDeptArri} />
                <b style={{paddingLeft: 10}}>To:</b>
                <Select
                    showSearch
                    addonBefore="To"
                    style={{width: 300, padding: 10}}
                    placeholder={"Arrival Airport"}
                    value={arriAirport}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange(setArriAirport)}
                    notFoundContent={null}
                    allowClear
                >
                    {options}
                </Select>
                {actionType==="view"?<RangePicker onChange={()=>{handleChange(setDeptDate);handleChange(setDeptDate2)}} picker="day" style={{width:200}} placeholder={["Begin With","End With"]}></RangePicker>:
                <DatePicker format={dateFormat} onChange={handleChange(setDeptDate)} style={{width:200}} placeholder={"Depate After"} />}
                
                <span style={{padding: 10}}> </span>
                <Button type="primary" onClick={actionType==="view"?handleViewFlights:actionType==="purchase"?handleSearchPurchase:handleSearchFlights}>Search</Button>
            </Input.Group>
            
            {(actionTab==="purchase")&&(
                <div>
            <p>Or use exact searching:</p>
            <Input
                addonBefore="Flight Number"
                placeholder="Airline Code + Digits"
                value={flightID}
                allowClear
                maxLength={6}
                style={{width: '50vw'}}
            />
            <b style={{padding: 10}}> </b>
        </div>)}
            <Divider />
            {flightsResult ? <FlightsResultTable data={flightsResult}  userType={userType} actionType={actionType} setRowRecord={setRowRecord} setAgentModalVis={setAgentModalVis} setCustomerModalVis={setCustomerModalVis}/> : null}
            
            {rowRecord? <AgentModal agentModalVis={agentModalVis} setAgentModalVis={setAgentModalVis} rowRecord={rowRecord} setRowRecord={setRowRecord}></AgentModal>:null}

            {rowRecord? <CustomerModal customerModalVis={customerModalVis} setCustomerModalVis={setCustomerModalVis} rowRecord={rowRecord} setRowRecord={setRowRecord}></CustomerModal>:null}
                
        </Card>
    )
}