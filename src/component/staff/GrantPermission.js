import React, {useState} from "react";
import {Input, Card, Button,Form,Select,Checkbox,message} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import moment from "moment";
import qs from "qs";


const CheckboxGroup = Checkbox.Group;

const options = ["Admin","Operator"];

const defaultCheckedList = ["Admin"];
export default function GrantPermission({loginInfo}){

    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

    const [form] = Form.useForm();

    const onFinish=(values)=>{
      form.setFields([
        {
            name:"username",
            errors:[]
        }
      ]);
      form.setFields([
        {
            name:"permission",
            errors:[]
        }
      ]);
        axios(
          {url:"http://localhost:8080/airlineStaff/grantPermission",
           method:"POST",
           data:{
            userName:values.username,
            airlineName:"Cathay Pacific",
            permission:checkedList
          }
        }).then(function(response){
          if(response.data){
            if(response.data.success===true){
                message.success("Success");
            }else{
              const errorMapping = response.data;
              if(errorMapping.nameValid===false){
                form.setFields([
                  {
                      name:"username",
                      errors:[ "AirlineStaff Not Found!"]
                  }
              ])
              }else if(errorMapping.permissionValid===false){
                form.setFields([
                  {
                      name:"permission",
                      errors:[ "The airlineStaff already has the permission!"]
                  }
              ])
              }
            }

          }
        })
    }

    const handleChange = (list)=>{
      setCheckedList(list);
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
        <Form.Item name="username" label="Staff UserName"
          rules={[
            {
              required:true,
              message:"Please input the username!"
            }
          ]}>
            <Input/>

        </Form.Item>

        <Form.Item name="permission" label="Permission Type">
        <CheckboxGroup options={options} value={defaultCheckedList} onChange={handleChange} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}> 
                <Button type="primary" htmlType="submit">
                    Grant Permission
                </Button>
            </Form.Item>


        </Form>




    </Card>)
}