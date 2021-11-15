import {Card, Form, Input, Button} from 'antd';
import React, {useState} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginCard() {
    let navigate = useNavigate();

    const [form] = Form.useForm();

    const [activeTab, setActiveTab] = useState('customer');

    const onTabChange = (key) => {
        setActiveTab(key);
        form.resetFields();
    }


    //字段验证成功，准备做登录校验
    const onFinish = (values) => {
        // loginRequest(values.username, md5(values.password), activeTab)
        
        axios({
            url:"http://localhost:8080/login",
            method:"post",
            data:{userType:activeTab,...values}
        }).then(function(response){
            const response_msg = response.data;
            if(response_msg==="success"){
                //登录成功
                navigate("/"+activeTab,{replace:true});
            }else{
                //诊断失败原因
                if(response_msg==="User Not Found!"){
                    form.setFields([
                        {
                            name:activeTab==="customer"?"email":"username",
                            errors:[ "User Not Found! Please Register First!"]
                        }
                    ])
                }else if(response_msg==="Password Error!"){
                    form.setFields([
                        {
                            name:"password",
                            errors:[response.data]
                        }
                    ])
                }else if(response_msg==="BookingId Error!"){
                    form.setFields([
                        {
                            name:"bookingAgentId",
                            errors:[response.data]
                        }
                    ])
                }
            }
            
        })
        console.log(values);
        // eslint-disable-next-line no-restricted-globals
        // navigate("/" + activeTab, {replace: true})
    }

    //说的是字段的值验证失败
    const onFinishFailed=()=>{
        alert("字段有误");
        console.log("haha");
    }



    const tabList = [
        {key: 'customer', tab: 'Customer'},
        {key: 'agent', tab: 'Booking Agent'},
        {key: 'staff', tab: 'Airline Staff'}
    ]

    const usernameMessage = {
        customer: "E-mail",
        agent: "E-mail",
        staff: "Username"
    }

    return (
        <Card
            style={{width: '30%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
            tabList={tabList}
            activeTab={activeTab}
            tabBarExtraContent={<a href="/">Back</a>}
            onTabChange={onTabChange}
        >
            <Form
                form={form}
                name="login"
                className="login-form"
                onFinish={onFinish}
                onFinishedFailed={onFinishFailed}
            >

            {
                activeTab==="staff"&&(<Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your " + usernameMessage[activeTab]
                         },
                         ]}
                         >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder={usernameMessage[activeTab]} />
                </Form.Item>)}

                {
                activeTab!="staff"&&(<Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                         },
                         { 
                             type:"email",
                             message:"This is not a valid email type"
                         }
                         ]}
                         >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder={"E-mail"} />
                </Form.Item>)}
            
                
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your password"}]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password" />
                </Form.Item>
                {activeTab==="agent"&&(
                <Form.Item
                    name="bookingAgentId"
                    rules={[{required: true, message: "Please input your booking agent Id"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder={"Agent Id"} />
                </Form.Item>)}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    <Button type="primary" className="register-form-button" style={{marginLeft:"130px"}} onClick={()=>{navigate("/register"+activeTab)}}>Register</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}