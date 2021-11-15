import React, {useState} from "react";
import {Input, Card, Button,Form} from "antd";

export default function EditAirport() {

    const onFinish =()=>{


    }

    const onFinishFailed = ()=>{

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
            onFinishedFailed={onFinishFailed}>
           </Form>
            <Form.Item
            name="airportName"
            label="Airport Name"
            rule={[
                {required:true,
                message:"Airport Name should not be empty!"}
            ]}>

                <Input ></Input>
            </Form.Item>

            <Form.Item
            name="airportCity"
            label="Airport City"
            rule={[
                {required:true,
                message:"Airport City should not be empty!"}
            ]}>

                <Input></Input>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}> 
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="primary" onClick={console.log("haha")}>
              Back
            </Button>
          </Form.Item>


        </Card>
    )
}