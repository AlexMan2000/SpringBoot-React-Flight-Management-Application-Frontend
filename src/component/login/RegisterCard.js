import React, { useState } from 'react';
import axios from "axios";
import {dateFormat} from "../../lib/dateFormat";
import {useNavigate} from "react-router-dom"
import qs from "qs";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Card,
  Row,
  Col,
  Checkbox,
  Select,
  Button,
  AutoComplete,
  DatePicker,
  message
} from 'antd';

axios.defaults.timeout = 2000;

export default function RegisterCard({initializeType,setRegisterModalVisible,setRegisterLoginValue,setNavigateBar}){
    const { Option } = Select;
    const navigate = useNavigate();
    const residences = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
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

      const [airlineList,setAirlineList] = useState([]);
    
      const onFinish = (values) => {
        axios({
          method:'POST',
          url:initializeType==="customer"?'http://localhost:8080/register/registerCustomer'
          :initializeType==="staff"?'http://localhost:8080/register/registerAirlineStaff':
          'http://localhost:8080/register/registerBookingAgent',
          data:values
        }).then(function(response){
            if(response.data==="success"){
              message.success("Register Completed!");
              // setRegisterLoginValue(values);
              setNavigateBar("global");
              setRegisterModalVisible(false);
              navigate("/global",{replace:true});
            }
        })
      };
    
      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>
      );
      const suffixSelector = (
        <Form.Item name="suffix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
          </Select>
        </Form.Item>
      );
      const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    
      const onWebsiteChange = (value) => {
        if (!value) {
          setAutoCompleteResult([]);
        } else {
          setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
      };
    
      const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
      }));

      const checkUserName = (rule,value,callback)=>{
            axios({
                method:'GET',
                url:'http://localhost:8080/register/validateAirlineStaff',
                params:{"username":value}
            }).then(function(response){
                if(response.data.valid===false){
                    callback("Staff already registered!");
                }else{
                    callback();
                }
            }).catch(function(error){
              message.error("Back end server not started!");
            })
      }

      const checkEmail = (inititalizeType,value,callback)=>{
        axios({
            method:'GET',
            url:(initializeType==="agent")?'http://localhost:8080/register/validateBookingAgent':
            "http://localhost:8080/register/validateCustomer",
            params:{"email":value}
        }).then(function(response){
            if(response.data.valid===false){
                if(initializeType==="agent"){
                callback("Agent already registered!");}
                else{
                    callback("Customer already registered!")
                }
            }else{
                callback();
            }
        }).catch(function(error){
          message.error("Back end server not started!");
        })
      }

      const getAirlineList = ()=>{
        axios({
          method:'GET',
          url:"http://localhost:8080/register/getAirlineList"
      }).then(function(response){
          setAirlineList(response.data);
          console.log("data injection completed")
      }).catch(function(error){
        message.error("Back end server not started!");
      })
      }


      return (
          <Card  title="Please input your personal information to register">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        > {initializeType!=="staff"&&(
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
              {
                  validator:checkEmail
              },
              
            ]}
            validateTrigger='onBlur'
            hasFeedback
          >
            <Input style={{width:'80%'}}/>
          </Form.Item>)
        }

        { initializeType==="staff"&&(
          <Form.Item
          name= "username"
          label= "Username"
          validateTrigger='onBlur'
          hasFeedback
          rules={
              [{
                  required :true,
                  message: 'Please input your username',
              },
              {
                  validator:checkUserName
              }
              ]
          }>
            <Input style={{width:'80%'}}></Input>
          </Form.Item>
         ) }

         { initializeType==="customer"&&(
          <Form.Item
          name= "name"
          label= "Name"
          rules={
              [{
                  required :true,
                  message: 'Please input your name',
              },
              ]
          }
          hasFeedback>
            <Input style={{width:'80%'}}></Input>
          </Form.Item>
         ) }
    
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
                },
                {
                  min:6,
                  message: "The length of the password cannot be less than 6 characters!"
                },
                {
                max:20,
                message: "The length of the password cannot be more than 20 characters!"},
                {
                pattern:/^[a-zA-Z]\w+/,
                message:'The password must start with alphabat'
                },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('email') !== value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('Email cannot be the same as the password!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password style={{width:'80%'}}/>
          </Form.Item>
    
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password style={{"width":"80%"}}/>
          </Form.Item>
    

          {initializeType==="staff"&&(
          <Form.Item
            name="firstName"
            label="First Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message:"Please input your last name!",
                whitespace: true,
              },
            ]}
          >
            <Input  style={{"width":"80%"}}/>
          </Form.Item>)
          }

          {initializeType==="staff"&&(
          <Form.Item
            name="lastName"
            label="Last Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message:"Please input your last name!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{"width":"80%"}}/>
          </Form.Item>)}
  
          {initializeType!=="agent"&&(
          <Form.Item
          name="birthday"
          label="Birth Day"
          tooltip="Click the calendar button to select a date"
          rules={[
                {required: true,
                message:"Please input your birth day!",
               }
          ]}>  
          <DatePicker format={dateFormat} style={{width:200}} />
            </Form.Item>)}

            {initializeType==="customer"&&(
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '80%',
              }}
            />
          </Form.Item>)}
    
          {initializeType==="staff"&&(
          <Form.Item
            name="airlineName"
            label="Airline Name"
            rules={[
              {
                required: true,
                message: 'Please input donation amount!',
              },
            ]}
          >
          {/* <Select onFocus={getAirlineList} placeholder="Please select a country" style={{width:"80%"}}>
            {airlineList.map((item)=>
               (<Option value={item} key={item}>{item}</Option>)
            )}
          </Select> */}
          <Input style={{
                width: '80%',
              }} ></Input>
          </Form.Item>)}
    
          {initializeType==="customer"&&(
          <Form.Item
            name="buildingNumber"
            label="Building Number"
            rules={[
              {
                required: true,
                message: 'Please input your building number!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="customer"&&(
          <Form.Item
            name="street"
            label="Street Info"
            rules={[
              {
                required: true,
                message: 'Please input your street info!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="customer"&&(
          <Form.Item
            name="city"
            label="City"
            tooltip="Could register with abbreviation"
            rules={[
              {
                required: true,
                message: 'Please input your city!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="customer"&&(
          <Form.Item
            name="livingState"
            label="State"
            rules={[
              {
                required: true,
                message: 'Please input your state info!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="customer"&&(
          <Form.Item
            name="passportNumber"
            label="Passport Number"
            rules={[
              {
                required: true,
                message: 'Please input your passport number!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="customer"&&(
          <Form.Item
            name="passportExpiration"
            label="Passport Expiration Date"
            rules={[
              {
                required: true,
                message: 'Please input your passport expiration date!',
              },
            ]}
          >
             <DatePicker format={dateFormat} style={{width:200}} />
          </Form.Item>)}
    
          {initializeType==="customer"&&(
          <Form.Item
            name="passportCountry"
            label="Passport Country"
            rules={[
              {
                required: true,
                message: 'Please input your passport country!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}

          {initializeType==="agent"&&(
          <Form.Item
            name="bookingAgentId"
            label="Agent Id"
            rules={[
              {
                required: true,
                message: 'Please input your agent ID!',
              },
            ]}
          >
            <Input style={{width:"80%"}}></Input>
          </Form.Item>)}



          <Form.Item
            name="intro"
            label="Intro"
          >
            <Input.TextArea showCount maxLength={100}  style={{"width":"80%"}}/>
          </Form.Item>
    
          {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item> */}
    
          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}
    
          {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>*/}
          <Form.Item {...tailFormItemLayout}> 
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="primary" onClick={()=>{setRegisterModalVisible(false);}}>
              Back
            </Button>
          </Form.Item>
        </Form>
        </Card>
  );
};


