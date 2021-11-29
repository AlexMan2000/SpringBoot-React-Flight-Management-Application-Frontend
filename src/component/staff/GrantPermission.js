import React, {useState} from "react";
import {Input, Card, Button,Form,Select} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import moment from "moment";
import qs from "qs";


const {Search} = Input;

const {Option} = Select;

export default function GrantPermission(){

    const [searchResult,setSearchResult] = useState([]);
    const [email,setEmail] = useState();

    const [form] = Form.useForm();

    const options = ["Admin","Operator"];
    
    const optionsMapped = options.map((item,index)=><Option key={index}>{item}</Option>)


    const onFinish=(values)=>{
        //提交请求
        console.log("papa");

    }

    const onFinishFailed = ()=>{
        console.log("");
    }



    const handleSearch = ()=>{


    }


    const handleChange = ()=>{

    }


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


    return (<Card title="Grant Permission">
        <Form 
        {...formItemLayout}
                form={form}
                name="Add Agents"
                onFinish={onFinish}
                 scrollToFirstError>
        <Form.Item name="email" label="Staff UserName">
            <Input/>

        </Form.Item>

        <Form.Item name="permission" label="Permission Type">
        <Select
            showSearch
                style={{width: 300, padding: 10}}
                placeholder={"Permission Type"}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                allowClear>
                {optionsMapped}
            </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}> 
                <Button type="primary" htmlType="submit">
                    Grant Permission
                </Button>
            </Form.Item>


        </Form>




    </Card>)
}