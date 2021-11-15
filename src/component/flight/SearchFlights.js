import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table} from 'antd';
import React, {useState} from "react";
import {SwapOutlined} from "@ant-design/icons";
import {statusColor} from "../../lib/statusTag";
import {dateFormat} from "../../lib/dateFormat";
import {customerInterfaceColumns,agentInterfaceColumns,globalInterfaceColumns, ticketColumns} from "../../lib/flightData";
import axios from "axios";
import moment from "moment";
import qs from "qs";

const {Search} = Input;
const {Option} = Select;

export function FlightsResultTable({data,userType,actionType}) {


    let columns = userType==="customer"? customerInterfaceColumns:userType==="agent"?agentInterfaceColumns:globalInterfaceColumns;

    // console.log(data);
    let dataMap = data;
    if(actionType!=="view"){
     dataMap = data.map(item=>{
        return({key:[item.airlineName,item.flightNum],
        flight_id:item.flightNum,
        dept:item.sourceAirportName,
        arri:item.destAirportName,
        dept_time:item.departureTime,
        arri_time:item.arrivalTime,
        price:item.price,
        status:[item.status]
        })
    })}else if(actionType==="view"){
         columns = ticketColumns
         dataMap = data.map(item=>{
            return({
                key:item.ticketId,
                ticket_id:item.ticketId,
                flight_id:item.flightNumber,
                dept:item.departAirportName,
                arri:item.arrivalAirportName,
                dept_time:item.departureTime,
                arri_time:item.arrivalTime,
                status:[item.status]
            })
        })
    }

    //根据actionTab 过滤展示的列
    if(actionType!=="purchase"){
        columns = columns.filter((item)=>item.title!="Action")
    }
    // console.log(columns);
    return (
        <Table columns={columns} dataSource={dataMap} size="middle"/>
    )
}

export default function SearchFlights({userType,actionTab,flightsResult,setFlightResult,actionType}) {
    // result body:
    // [{most match: city if city, airport if airport},
    // {cities if city, airports if airport}, ...,
    // {airports if city, cities if airport}, {}]

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today
    const [searchResult, setSearchResult] = useState([]);
    // const [flightsResult, setFlightResult] = useState(null);
    const [flightID, setFlightID] = useState(undefined);


    //for testing ONLY
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
        // console.log(deptAirport);
        // console.log(arriAirport);
        // console.log(actionTab);
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
                // console.log(response.data);
                // console.log("haha");
            }else{
                console.log("No Results");
            }
        })

        // setFlightResult("testing")
    }

    const handleExactSearch = () => {
        setFlightResult("testing");
    }

    const handlePurchase = ()=>{
        


    }

    const handleViewFlights = ()=>{
        let sendObject = null;
        if(deptDate===""){
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
            })
        }
        axios({
            url:userType==="customer"?"http://localhost:8080/customer/getMyFlights":"http://localhost:8080/agent/getMyFlights",
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
                <DatePicker format={dateFormat} onChange={handleChange(setDeptDate)} style={{width:200}} />
                <span style={{padding: 10}}> </span>
                <Button type="primary" onClick={actionType==="view"?handleViewFlights:handleSearchFlights}>Search</Button>
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
            <Button type={"primary"} onClick={handleExactSearch}>Exact Searching</Button></div>)}
            <Divider />
            {flightsResult ? <FlightsResultTable data={flightsResult} userType={userType} actionType={actionType}/> : null}
        </Card>
    )
}