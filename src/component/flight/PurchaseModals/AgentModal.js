import React, { useState,useEffect } from 'react';
import { Select,Form, Button, Input, Modal, DatePicker, InputNumber, message} from 'antd';
import { render } from '@testing-library/react';
import axios from "axios";
import moment from "moment";
import qs from "qs";





export default function AgentModal(props){

    const {agentModalVis,setAgentModalVis,rowRecord} = props;

    const [ticketIds,setTicketIds] = useState([]);

    const formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
      };
    
    const FormItem = Form.Item;
    
    const { Option } = Select;

    const [form] = Form.useForm();

    const options = ticketIds.map(item => <Option key={item}>{item.ticket_id}</Option>);

    const purchaseAgent = ()=>{
        axios({
            url:"http://localhost:8080/bookingAgent/purchaseTicket",
            method:"POST",
            data:{
                airlineName:rowRecord.airlineName,
                flightNum:rowRecord.flightNum,
                
            }
        }).then(function(response){
            if(response.data){
                console.log("haha");
                setTicketIds(response.data);
            }
        })

    }


    const searchTicketId = ()=>{
        const sendObject = qs.stringify({
            airlineName:rowRecord.airline,
            flightNum:rowRecord.flight_id,
        });
        console.log(sendObject);
        axios({
            url:"http://localhost:8080/bookingAgent/findAllAvailableTickets",
            method:"POST",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            },
            data:qs.stringify({
                airlineName:rowRecord.airline,
                flightNum:rowRecord.flight_id,
            })
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                setTicketIds(response.data);
            }
        })
    }



    const renderContent = () => {
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
                name="ticketNumber"
                label="Ticket No."
                rules={[{required:true,message:"Please select a ticket."}]}>
                <Select 
                    style={{width: 300, padding: 0}}
                    placeholder={"Select Tickets No."}
                    value={ticketIds}
                    showSearch
                    onSearch={searchTicketId}
                    allowClear
                >
                    {options}
                </Select>
            </FormItem>

          </>
        );
      };
    
    const renderFooter = () => {
        return (
          <>
            <Button onClick={() => setAgentModalVis(false)}>Cancel</Button>
            <Button type="primary" onClick={() => purchaseAgent()}>
              Purchase
            </Button>
          </>
        );
      };


    return (<Modal width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Purchase Ticket"
        visible={agentModalVis}
        footer={renderFooter()}
        onCancel={() => setAgentModalVis(false)}>
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