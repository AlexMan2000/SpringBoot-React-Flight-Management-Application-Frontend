import React, {useState} from "react";
import {Input, Card, Button,Form,Select} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import moment from "moment";
import qs from "qs";


const {Search} = Input;

const {Option} = Select;

export default function AddAgents() {

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


    const onFinish =()=>{

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
                <Form.Item name="email" label="Agent Email">
                    <Select
                        showSearch
                        style={{width: 300, padding: 10}}
                        placeholder={"Email"}
                        value={email}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        notFoundContent={null}
                        allowClear
                    >
                        {options}
                    </Select>
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