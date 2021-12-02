import React, { useState,useEffect } from 'react';
import { Select,Form, Button, Input, Modal, DatePicker, InputNumber, message, List} from 'antd';
import { render } from '@testing-library/react';
import axios from "axios";
import moment from "moment";
import qs from "qs";





export default function AgentModal(props){

    const {loginInfo,agentModalVis,setAgentModalVis,rowRecord,setRowRecord} = props;
    const [showStatus,setStatus] = useState("purchase"); //用于控制显示购票成功的信息
    // 展示随机生成的TicketId, 被代理人的Email, 和赚取的Commission Fee.
    const [purchaseInfo,setPurchaseInfo] = useState({});

    const formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
      };
    
    const FormItem = Form.Item;
    
    const [form] = Form.useForm();

    const data = [
      {
        title: 'Airline Name',
        description: purchaseInfo["airlineName"]
      },
      {
        title: 'Flight No.',
        description: purchaseInfo["flightNum"]
      },
      {
        title: 'Customer on behalf',
        description: purchaseInfo["email"]
      },
      {
        title: 'Commission Fee Earned',
        description: purchaseInfo["commissionFee"]
      },
      {
        title: 'Purchase Date',
        description: purchaseInfo["purchaseDate"]
      },
      {
        title: 'Ticket ID',
        description: purchaseInfo["ticketNum"]
      },
    ];

    const purchaseAgent = ()=>{
        axios({
            url:"http://localhost:8080/bookingAgent/purchaseTicket",
            method:"POST",
            data:{
              airlineName:form.getFieldValue("airlineName"),
              flightNum:form.getFieldValue('flightNum'),
                email:form.getFieldValue("email"),
                bookingAgentId:loginInfo.current?loginInfo.current.bookingAgentId:13123123,
            }
        }).then(function(response){
            //购票成功, 展示数据
            if(response.data){
                setStatus("confirm");
                setPurchaseInfo(response.data);
            }
        })

    }

    const checkEmail = (inititalizeType,value,callback)=>{
      axios({
          method:'GET',
          url:"http://localhost:8080/bookingAgent/validateCustomer",
          params:{"email":value}
      }).then(function(response){
          if(response.data.valid===false){
            console.log("false");
              callback("Customer Email not found!");
          }else{
              callback();
          }
      })
    }

    const renderContent = () => {

        if(showStatus === "purchase"){
          return (
            <>
              <FormItem
                name="flightNum"
                label="Flight Number"
                rules={[{ required: true, message: 'Please input flight number!' }]}
              >
                <Input disabled={true} placeholder="请输入" />
              </FormItem>
              <FormItem
                name="airlineName"
                label="Airline Name"
                rules={[{ required: true, message: 'Please input airline name!' }]}
              >
                <Input disabled={true} placeholder="请输入" />
              </FormItem>
              <FormItem
              name="email"
              label="Customer Email"
              rules={[{
                required:true, message:"Please input the customer email that you want to purchase on behalf of"
              },{
                    validator:checkEmail
                },]}>
                <Input placeholder="Please input customer email"></Input>
              </FormItem>
            </>
          );

        }else if(showStatus === "confirm"){
          return (<>
            <List 
              itemtlayout = {"horizontal"}
              dataSource={data}
              renderItem={item=>
              (<List.Item
                  >
                  <List.Item.Meta
                  title={item.title}
                  description={item.description}>

                  </List.Item.Meta>
              </List.Item>)}>
            </List>
          </>)
        }

        
      };
    
    const renderFooter = () => {
        if(showStatus === "purchase"){
        return (
          <>
            <Button onClick={() => setAgentModalVis(false)}>Cancel</Button>
            <Button type="primary" onClick={() => purchaseAgent()}>
              Purchase
            </Button>
          </>
        );}else if(showStatus==="confirm"){
          return (<>
            <Button type="primary" onClick={()=>{setAgentModalVis(false);setStatus("purchase");}}>
              Confirm
            </Button>
          </>)
        }
      };

      console.log(rowRecord.airline);
    return (<Modal width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={showStatus==="purchase"?"Purchase Ticket":"Purchasement Info"}
        visible={agentModalVis}
        footer={renderFooter()}
        onCancel={() => {setAgentModalVis(false);setRowRecord(false)}}>
         <Form
          {...formLayout}
          form={form}
            initialValues={{
                airlineName:rowRecord.airline,
                flightNum:rowRecord.flight_id
            }}
        >
          {renderContent()}
        </Form>
        
    </Modal>)




}