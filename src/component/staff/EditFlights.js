import React,{useEffect,useState} from "react";
import moment from "moment";
import axios from "axios";
import {dateFormat} from "../../lib/dateFormat";
import {staffViewFLightColumns} from "../../lib/flightData";
import "antd/dist/antd.css";
import {v4 as uuidv4} from "uuid";

import {Input,Button,Form,Layout, Row, Col,Modal} from "antd";
import FlightTable from "../staff/CRUDElements/FlightTable";
import FlightForm from "../staff/CRUDElements/FlightForm";
import EditFlightForm from "../staff/CRUDElements/EditFlightForm";

export default function FlightEdit(){

    const {Content} = Layout;

    const dataSource = [
        {
          flight_id: "MU1234",
          airline_name:"Cathay Pacific",
          departure_airport:"PVG",
          departure_time:"2020-01-01",
          arrival_airport:"SZX",
          arrival_time:"2020-01-02",
          price:3030,
          status:["upcoming"],

        },
        {
          flight_id: "MU1235",
          airline_name:"Cathay Pacific",
          departure_airport:"PVG",
          departure_time:"2024-01-01",
          arrival_airport:"SZX",
          arrival_time:"2024-01-01",
          price:3030,
          status:["upcoming"],
        },
        {
            flight_id: "MU1236",
            airline_name:"Cathay Pacific",
            departure_airport:"PVG",
            departure_time:"2077-01-03",
            arrival_airport:"SZX",
            arrival_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
        },
      ];


    // 用于设置table表中的数据
    const [flights,setFlights] = useState(dataSource);

    // 用于设置是否编辑, 控制弹窗
    const [editing,setEditing] = useState(false);

    //设置当前选中的行
    const [currentFlight,setCurrentFlight] = useState("MU1234");

    //定义查询的filter状态
    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today


    //定义回调函数,和数据库交互
    //增
    const addFlight = (flight)=>{

    }

    //改,用于将数据回写到EditForm中
    const editFlight = (flight)=>{
        setEditing(true);


    }

    //改，用于更新数据，和数据库交互
    const updateFlight = (flight)=>{
        setEditing(false);

    }

    //删
    const deleteFlight=(id)=>{
        //获取到当前行的唯一标识, 向数据库发送请求删除用户
    } 

    //查询
    const queryFlight=()=>{
        //发送请求查询所有
    }

    const handleOk = ()=>{


    }

    const handleCancel =()=>{


    }

    useEffect(()=>{
        queryFlight();
    })

    return (<Content>
        <br />
        <br />
        <Row justify="space-around">
          
            { editing?(
              <Modal title={"Edit Flight"} visiable={editing} onOk={handleOk} onCancel={handleCancel}>
                <EditFlightForm setEditing={setEditing} updateFlight={updateFlight} currentFlight={currentFlight} />
              </Modal>
            ):(
              <Modal title={"Add Flight"} visible={editing} >
                <h2>Add Flight</h2>
                <FlightForm addFlight={addFlight} />
              </Modal>
            )}
          <Col xs={40} sm={40} md={32} lg={24}>
            <h2>View Flights</h2>
            <FlightTable flights={flights} deleteFlight={deleteFlight} editFlight={editFlight} />
          </Col>
        </Row>
      </Content>)



}