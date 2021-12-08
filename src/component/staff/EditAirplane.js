import React, {useState} from "react";
import {Input, Card, Button,Form,InputNumber,message,Space,Table} from "antd";
import qs from "qs";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";

export default function EditAirport({loginInfo}) {

    const [tableData,setTableData] = useState([]);

    const tableColumns=[
      {
        title:"Airplane Id",
        dataIndex:"id",
        key:"airplane_id",
        width:200
      },
      {
        title:"Airline Name",
        dataIndex:"airline",
        key:"airline_name",
        width:200
      },
      {
        title:"Seat Number",
        dataIndex:"seats",
        key:"seats",
        width:200
      },
    ]

    const getAirplanes = ()=>{
      axios({
        url:"http://localhost:8080/airlineStaff/getAllAirplanes",
        method:"GET",
        params:{
          airlineName:loginInfo.current?loginInfo.current.airlineName:""
        }
      }).then(function(response){
        if(response.data){
          setTableData(response.data);
        }
      })
    }

    useEffect(()=>{
      getAirplanes();
    },["airport"])

    const onFinish =(values)=>{
      axios({
        url:"http://localhost:8080/airlineStaff/addNewAirplane",
        method:"post",
        data:{airline:loginInfo.current?loginInfo.current.airlineName:undefined,
              id:values.airplaneId,
              seats:values.seats
              }
      }).then(function(response){
        if(response.data==="success"){
          message.success({
            content: 'Insertion Completed',
            className: 'custom-class',
            style: {
              marginTop: '40vh',
            },
          });
          getAirplanes();
        }else{
          message.error({
            content: 'You have already inserted this airplane information!',
            className: 'custom-class',
            style: {
              marginTop: '40vh',
            },
          });
        }
      })

    }

    const onFinishFailed = ()=>{
      message.error("Evaluation Failed!");
    }

    const onReset = ()=>{
      form.resetFields();
    }

    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 0,
          },
        },
      };


      const initialvalue = {
        airlineName:loginInfo.current?loginInfo.current.airlineName:undefined,
        airplaneId:undefined,
        seats:200
      }

    const [form] = Form.useForm();
    return (
      <Space align="center" size={100}>
      {loginInfo.current?loginInfo.current.permissionDescription?loginInfo.current.permissionDescription.includes("Admin")?
        <Card style={{marginLeft:50}} title="Add airplane">
           <Form
           form={form}
            name="airplane"
            className="airplane-form"
            onFinish={onFinish}
            onFinishedFailed={onFinishFailed}
            initialValues={initialvalue}>
           
            <Form.Item
            name="airlineName"
            label="Airline Name"
            rules={[
                {required:true,
                message:"Aiport Name should not be empty!"}
            ]}>

                <Input disabled={true} ></Input>
            </Form.Item>

            <Form.Item
            name="airplaneId"
            label="Airplane Id"
            rules={[
                {required:true,
                message:"Aiport Id should not be empty!"}
            ]}>

                <Input></Input>
            </Form.Item>

            <Form.Item
            name="seats"
            label="Seat Number"
            >

                <InputNumber  ></InputNumber>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}> 

              <Button type="primary" htmlType="submit" >
                Add
              </Button>

              <Button type="primary" onClick={onReset} style={{marginLeft:50}}>
                Reset
              </Button>
          </Form.Item>
          </Form>

        </Card>: 
        
        
        <Card style={{marginLeft:50}} title="Add airplane">
            You don't have permission to add airplanes.
        </Card>:null:null}
        <Card title="All the airplane for your airline company"><Table width={300} columns={tableColumns} dataSource={tableData} size="middle"/></Card>
        </Space>
    )
}