import React, {useState} from "react";
import {Input, Card, Button,Form,InputNumber,message} from "antd";
import qs from "qs";
import moment from "moment";
import axios from "axios";

export default function EditAirport() {

    const onFinish =(values)=>{
      console.log(values);
      axios({
        url:"http://localhost:8080/airlineStaff/addNewAirplane",
        method:"post",
        data:{airline:values.airlineName,
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
        console.log("验证失败");
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
            offset: 8,
          },
        },
      };

    const [form] = Form.useForm();
    return (
        <Card title="Airplane Information Management">
           <Form
           form={form}
            name="airplane"
            className="airplane-form"
            onFinish={onFinish}
            onFinishedFailed={onFinishFailed}>
           
            <Form.Item
            name="airlineName"
            label="Airline Name"
            rules={[
                {required:true,
                message:"Aiport Name should not be empty!"}
            ]}>

                <Input ></Input>
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

                <InputNumber defaultValue={200} ></InputNumber>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}> 
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            <Button type="primary" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
          </Form>

        </Card>
    )
}