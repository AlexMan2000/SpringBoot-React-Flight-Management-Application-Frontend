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
        <Card title="Airplane Information Management">
           <Form
           form={form}
            name="airplane"
            className="airplane-form"
            onFinish={onFinish}
            onFinishedFailed={onFinishFailed}>
           </Form>
            <Form.Item
            name="airlineName"
            label="Airline Name"
            rule={[
                {required:true,
                message:"Aiport Name should not be empty!"}
            ]}>

                <Input ></Input>
            </Form.Item>

            <Form.Item
            name="airplaneId"
            label="Airplane Id"
            rule={[
                {required:true,
                message:"Aiport Id should not be empty!"}
            ]}>

                <Input></Input>
            </Form.Item>

            <Form.Item
            name="seats"
            label="Seat Number"
            rule={[
                {required:true,
                message:"Please register seat number!"}
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