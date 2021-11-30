import React, {useState} from "react";
import {Input, Card, Button,Form,Select,message} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import moment from "moment";
import qs from "qs";


const {Search} = Input;

const {Option} = Select;

export default function AddAgents({loginInfo}) {

    const [email,setEmail] = useState(undefined);
    const [searchResult,setSearchResult] = useState([]);
    const navigate = useNavigate();

    const handleSearch=()=>{
        axios({
            url:"",
            method:"POST",
            data:{}
        }).then(function(response){
            if(response.data){
                setSearchResult(response.data);
            }else{
                console.log("请求无结果");
            }
        })
    }


    const handleChange = (value)=>{
        setEmail(value);
        console.log("changed");
    }


    const onFinish =(values)=>{
      axios.post("http://localhost:8080/airlineStaff/addBookingAgent",
      qs.stringify({...values,airlineName:"Spring Airlines"})).then(function(response){
        if(response.data){
          if(response.data.success===true){
            message.success("Addition Succeeded!")
          }else{
            const responseMapping = response.data;
            if(responseMapping){
              if(responseMapping.emailValid===false){
                form.setFields([
                  {
                      name:"email",
                      errors:[ "BookingAgent Not Found!"]
                  }
              ])
              }else if(responseMapping.workingValid===false){
                form.setFields([
                  {
                      name:"email",
                      errors:[ "BookingAgent has already been assigned this airline!"]
                  }
              ])
            }
          }
        }
      }
    })
    }

    const options = searchResult.map((item,index)=>(<Option key={index}>{item}</Option>));

    const [form] = Form.useForm();

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

    return (
        <Card title="Add Booking Agents">
            <Form
            {...formItemLayout}
                form={form}
                name="Add Agents"
                onFinish={onFinish}
                 scrollToFirstError>
                <Form.Item name="email" 
                label="Agent Email"
                rules={[
                  {
                    required: true,
                    message:"Please don't leave blank the agent information!"
                  },
                  {
                    type:"email",
                    message:"Please input the right format of an email"
                  },
                  
                  ]}
                hasFeedback>
                    <Input style={{width:'80%'}}/>
                </Form.Item>


                <Form.Item {...tailFormItemLayout}> 
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
            </Form>

        </Card>
    )
}