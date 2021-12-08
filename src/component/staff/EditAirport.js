import React, {useState} from "react";
import {Input, Card, Button,Form,message} from "antd";
import qs from "qs";
import moment from "moment";
import axios from "axios";

export default function EditAirport({loginInfo}) {

    const onFinish =(values)=>{
      axios({
        url:"http://localhost:8080/airlineStaff/addNewAirport",
        method:"post",
        data:values
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
            content: 'You have already inserted this airport!',
            className: 'custom-class',
            style: {
              marginTop: '40vh',
            },
          });
        }
      })
    }

    const onFinishFailed = ()=>{
      message.error("Evaluation Failed!");    }

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
        <Card title="Airport Information Management">
           <Form
           form={form}
            name="airport form"
            className="airport_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError>
           
            <Form.Item
            name="airportName"
            label="Airport Name"
            rules={[
                {
                  required:true,
                message:"Airport Name should not be empty!"
                }
            ]}
            validateTrigger='onBlur'
            hasFeedback>

                <Input ></Input>
            </Form.Item>

            <Form.Item
            name="airportCity"
            label="Airport City"
            validateTrigger='onBlur'
            rules={
              [
                {
                  required:true,
                message:"Airport City should not be empty!"}
            ]}
            hasFeedback>

                <Input></Input>
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