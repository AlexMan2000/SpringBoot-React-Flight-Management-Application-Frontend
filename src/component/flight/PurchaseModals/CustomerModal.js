import React, { useState } from 'react';
import { Select,Form, Button, Input, Modal, DatePicker, InputNumber, message,List} from 'antd';
import { render } from '@testing-library/react';
import moment from "moment";
import axios from "axios";

export default function CustomerModal(props){

    const {loginInfo,customerModalVis,setCustomerModalVis,rowRecord,setRowRecord} = props;
    const [showStatus,setStatus] = useState("purchase"); //用于控制显示购票成功的信息
    // 展示随机生成的TicketId, 航班信息，购买时间
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
        title: 'Purchase Date',
        description: purchaseInfo["purchaseDate"]
      },
      {
        title: 'Ticket ID',
        description: purchaseInfo["ticketNum"]
      },
    ];


    const purchaseCustomer = ()=>{
        console.log({
            airlineName:form.getFieldValue("airlineName"),
            flightNum:form.getFieldValue('flightNum'),
              email:loginInfo.current?loginInfo.current.email:"12345@qq.com",
              bookingAgentId:null
          });
        axios({
            url:"http://localhost:8080/customer/purchaseTicket",
            method:"POST",
            data:{
              airlineName:form.getFieldValue("airlineName"),
              flightNum:form.getFieldValue('flightNum'),
                email:loginInfo.current?loginInfo.current.email:"12345@qq.com",
                bookingAgentId:null
            }
        }).then(function(response){
            //购票成功, 展示数据
            if(response.data){
                setStatus("confirm");
                setPurchaseInfo(response.data);
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
                <Input disabled={true}  />
              </FormItem>
              <FormItem
                name="airlineName"
                label="Airline Name"
                rules={[{ required: true, message: 'Please input airline name!' }]}
              >
                <Input disabled={true}  />
              </FormItem>
            </>
          );

        }else if(showStatus === "confirm"){
          return (<>
            <List 
              itemtlayout = {"horizontal"}
              dataSource={data}
              renderItem={item=>{
                if(item.title==="Purchase Date"){
                  return(<List.Item
                  >
                  <List.Item.Meta
                  title={item.title}
                  description={moment(item.description).format("yyy-MM-DD")}>

                  </List.Item.Meta>
              </List.Item>)
                }
              return (<List.Item
                  >
                  <List.Item.Meta
                  title={item.title}
                  description={item.description}>

                  </List.Item.Meta>
              </List.Item>)}}>
            </List>
          </>)
        }

        
      };
    
    const renderFooter = () => {
        if(showStatus === "purchase"){
        return (
          <>
            <Button onClick={() => setCustomerModalVis(false)}>Cancel</Button>
            <Button type="primary" onClick={() => purchaseCustomer()}>
              Purchase
            </Button>
          </>
        );}else if(showStatus==="confirm"){
          return (<>
            <Button type="primary" onClick={()=>{setCustomerModalVis(false);setStatus("purchase");}}>
              Confirm
            </Button>
          </>)
        }
      };


    return (<Modal width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={showStatus==="purchase"?"Purchase Ticket":"Purchasement Info"}
        visible={customerModalVis}
        footer={renderFooter()}
        onCancel={() => {setCustomerModalVis(false);setRowRecord(false);}}>
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