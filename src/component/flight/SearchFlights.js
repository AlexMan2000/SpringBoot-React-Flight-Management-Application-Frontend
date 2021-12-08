import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table,Modal,message} from 'antd';
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
import cookie from 'react-cookies';
import {useNavigate} from "react-router-dom";

const {Search} = Input;
const {Option} = Select;

axios.defaults.timeout = 2000;


const formatterTime = (val) => {
    return val ? moment(val).format("YYYY-MM-DD HH:mm:ss"): ''
}

export function FlightsResultTable(props) 
{
    const {data,userType,loginInfo,actionType,setRowRecord,setCustomerModalVis,setAgentModalVis} = props;
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
            key: "dept_time",
            render: formatterTime
        },
        {
            title: "Arri. Time",
            dataIndex: "arri_time",
            key: "arri_time",
            render: formatterTime
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
            title: "Remaining Seats",
            dataIndex: "remainingSeats",
            key: "seats"
        },
        {
            title: "Purchasing Date",
            dataIndex: "purchaseDate",
            key: "purchaseDate"
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
            key: "dept_time",
            render: formatterTime
        },
        {
            title: "Arri. Time",
            dataIndex: "arri_time",
            key: "arri_time",
            render: formatterTime
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
        remainingSeats:item.remainingSeats,
        status:[item.status]
        })
    })}else if(actionType==="view"){
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
                purchaseDate:item.purchaseDate?moment(item.purchaseDate).format("YYYY-MM-DD"):undefined,
                customerEmail:item.customerEmail,
                status:[item.status]
            })
        })
    }

    if(actionType!=="view"){
        columns = columns.filter((item)=>(item.title!="Ticket Id")&&(item.title!=="Customer Email")&&(item.title!="Purchasing Date"));
    }
    //根据actionTab 过滤展示的列
    if(actionType!=="purchase"){
        columns = columns.filter((item)=>item.title!="Action"&&(item.title!=="Remaining Seats"))
    }

    if(actionType==="search"){
        columns = columns.filter((item)=>item.title!="User ID");
    }

    return (
        <Table columns={columns} dataSource={dataMap} size="middle"/>
    )
}

export default function SearchFlights({loginInfo,userType,deptDate,setDeptDate,actionTab,setNavigateBar,flightsResult,setFlightResult,actionType}) {

    const {RangePicker} = DatePicker;

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    // const [deptDate, setDeptDate] = useState(undefined); //today
    const [searchResult, setSearchResult] = useState([]);
    // 设置点击购买按钮后的数据
    const [rowRecord,setRowRecord] = useState(undefined);

    // 设置模态对话框用于提交购买信息
    const [agentModalVis,setAgentModalVis] = useState(false);
    const [customerModalVis,setCustomerModalVis] = useState(false);

    const navigate = useNavigate();


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

        axios({
            url:"http://localhost:8080/index/searchFlights",
            method:"POST",
            data: {sourceAirportName:deptAirport,
                destAirportName:arriAirport,
                departureTime:deptDate?moment(deptDate).format("YYYY-MM-DD HH:mm:ss"):undefined}
        }).then(function(response){
            // if(response.data["statusCode"]==503){
            //     loginInfo.current = null;
            //     cookie.remove("JSESSIONID");
            //     setNavigateBar("global");
            //     navigate("/global", {replace: true})
            // }

            if(response.data){
                setFlightResult(response.data);
            }else{
                console.log("No Results");
            }
        }).catch(function(response){
            setFlightResult(null);
            message.error("Back end server not started!");
        })

    }

    const handleSearchPurchase = () => {
        axios({
            url:userType==="customer"?"http://localhost:8080/customer/getAllAvailableFlights":"http://localhost:8080/bookingAgent/getAllAvailableFlights",
            method:"POST",
            data: {
                sourceAirportName:deptAirport,
                destAirportName:arriAirport,
                departureTime:deptDate?moment(deptDate).format("YYYY-MM-DD HH:mm:ss"):undefined
            }
        }).then(function(response){
            if(response.data){
                setFlightResult(response.data);
            }else{
                message.error("Back end server not started!");
            }
        })

    }

    // const handleExactSearch = () => {
    //     setFlightResult("testing");
    // }


    // 处理和ViewFlights相关的请求
    const handleViewFlights = ()=>{
        let sendObject = null;
        if(deptDate===""){
            sendObject = qs.stringify({
                sourceAirport:deptAirport,
                destAirport:arriAirport,
                email:loginInfo.current?loginInfo.current.email:"abababababa@gmail.com",
            })
        }else{
            sendObject= qs.stringify({
                sourceAirport:deptAirport,
                destAirport:arriAirport,
                email:loginInfo.current?loginInfo.current.email:"abababababa@gmail.com",
                startDate:deptDate?moment(deptDate[0]).format("YYYY-MM-DD HH:mm:ss"):undefined,
                endDate:deptDate?moment(deptDate[1]).format("YYYY-MM-DD HH:mm:ss"):undefined
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
                setFlightResult(response.data);
            }else{
            }
        }).catch(function(response){
            message.error("Back end server not started!")
        })
    }

    const defineCardTitle = ()=>{
        if(actionType==="view"){

            if(userType==="customer"){
                return `Click Search for your fligh information, ${loginInfo.current?loginInfo.current.alias:"username"}!`
            }else{
                return `Click Search for the orders you created for customers!`
            }
        }else if(actionType==="purchase"){
            
            if(userType==="customer"){
                return `Start planning your journey, ${loginInfo.current?loginInfo.current.alias:"username"}!`
            }else{
                return `Click Search for the avaliable flights!`
            }
        }else{
            if(userType==="customer"){
                return `Click Search to see upcoming flights, ${loginInfo.current?loginInfo.current.alias:"username"}!`
            }else{
                return 'Click Search to See upcoming flights!'
            }
        }
    }


    const defineRangeFilterTitle = ()=>{
        if(actionType==="view"){
            return (userType==="customer"?"Departure Time:":"Purchase Date:")
        }else{
            return "Departure Time:"
        }




    }


    return (
        <Card title={defineCardTitle()}>
            <Input.Group>
                <b>From:</b>
                <Select
                    showSearch
                    addonBefore="From"
                    style={{width: 230, padding: 10}}
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
                    style={{width: 230, padding: 10}}
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
                <b style={{paddingLeft: 10,paddingRight:10}}>{defineRangeFilterTitle()}</b>
                {actionType==="view"?<RangePicker onChange={setDeptDate} value={deptDate} format={"YYYY-MM-DD HH:mm:ss"} showTime={{ defaultValue: moment('YYYY-MM-DD HH:mm:ss') }} style={{width:300}} placeholder={["Begin With","End With"]}></RangePicker>:
                <DatePicker format={"YYYY-MM-DD HH:mm:ss"} value={deptDate} onChange={handleChange(setDeptDate)} showTime={{ defaultValue: moment('YYYY-MM-DD HH:mm:ss') }}
   style={{width:300}} placeholder={"Depate After"} />}
                
                <span style={{padding: 10}}> </span>
                <Button type="primary" onClick={actionType==="view"?handleViewFlights:actionType==="purchase"?handleSearchPurchase:handleSearchFlights}>Search</Button>
            </Input.Group>
            
        
            <Divider />
            {flightsResult ? <FlightsResultTable data={flightsResult} loginInfo={loginInfo} userType={userType} actionType={actionType} setRowRecord={setRowRecord} setAgentModalVis={setAgentModalVis} setCustomerModalVis={setCustomerModalVis}/> : null}
            
            {rowRecord? <AgentModal loginInfo={loginInfo} agentModalVis={agentModalVis} setAgentModalVis={setAgentModalVis} rowRecord={rowRecord} setRowRecord={setRowRecord}></AgentModal>:null}

            {rowRecord? <CustomerModal loginInfo={loginInfo} customerModalVis={customerModalVis} setCustomerModalVis={setCustomerModalVis} rowRecord={rowRecord} setRowRecord={setRowRecord}></CustomerModal>:null}
                
            
            {/* {flightResult&&defaultData?} */}

        </Card>
    )
}