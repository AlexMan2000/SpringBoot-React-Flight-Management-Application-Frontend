import React, { useState } from 'react';
import { Select,Form, Button, Input, Modal, DatePicker, InputNumber, message} from 'antd';
import { render } from '@testing-library/react';
import moment from "moment";
import axios from "axios";

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

const FormItem = Form.Item;

const { Option } = Select;

export default function CreateForm(props){
    const{modalVisible,onCancel,onSubmit,handleCreateModalVisible,handleCreate} = props;
    const[formVals,setFormVals] = useState({}); //用于批量添加，暂时用不到

    const [form] = Form.useForm();


    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

    const options = ["upcoming","cancelled",
    "checking in",
    "delayed",
    "on time"];
    const optionsData = options.map((item)=><Option key={item}>{item}</Option>)

    

    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        axios({
          url:"http://localhost:8080/airlineStaff/validateNewAirplane",
          method:"POST",
          data:{
            id:fieldsValue.airplaneId,
            airline:fieldsValue.airlineName
          }
        }).then(function(response){
          if(response.data==="success"){
            setFormVals({ ...formVals, ...fieldsValue});
            handleCreate({ ...formVals, ...fieldsValue});
          }else{
            message.error({
              content: 'This airline name and airplane id is not found in the database!',
              className: 'custom-class',
              style: {
                marginTop: '40vh',
              },
            });
          }
        })
        
      };

    const renderContent = () => {
        return (
          < >
            <FormItem
              name="flightNum"
              label="Flight Number"
              rules={[{ required: true, message: 'Please input flight number!' }]}
            >
              <Input placeholder="e.g. MU672" />
            </FormItem>
            <FormItem
              name="airlineName"
              label="Airline Name"
              rules={[{ required: true, message: 'Please input airline name' }]}
            >
              <Input placeholder="e.g. Cathay Pacific" />
            </FormItem>
    
            <FormItem
              name="sourceAirportName"
              label="Departure Airport"
              rules={[{ required: true, message: 'Please Input Departure Airport' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue('destAirportName') !== value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('The arrivalAirport should not be the same as the departure Airport!'));
                },
              }),]}
            >
              <Input placeholder="e.g. PVG" />
            </FormItem>
            <FormItem
              name="departureTime"
              label="Departure Time"
              rules={[{ required: true, message: 'Please input Departure Time' },
              ]}
              >
              <DatePicker 
               format="YYYY-MM-DD HH:mm:ss"
               disabledDate={disabledDate}
               showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }
              
              }></DatePicker>
            </FormItem>


            <FormItem
              name="destAirportName"
              label="Arrival Airport"
              rules={[{ required: true, message: 'Please Input Arrival Airport' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue('sourceAirportName') !== value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('The arrival airport should not be the same as the departure airport!'));
                },
              }),]}
            >
              <Input placeholder="e.g. SZX" />
            </FormItem>


            <FormItem
              name="arrivalTime"
              label="Arrival Time"
              rules={[{ required: true, message: 'Please input Arrival Time' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (moment(value)>moment(getFieldValue("departureTime"))) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('You cannot set the arrival time to be earlier than  the departure time!'));
                },
              }),]}
              >
              <DatePicker 
               format="YYYY-MM-DD HH:mm:ss"
               disabledDate={disabledDate}
               showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}></DatePicker>
            </FormItem>

            <FormItem 
              name="price"
              label="price"
              rules={[{
                  required: true,
                  message: "Please indicate the price of this flight!"
              }]}>
              <InputNumber min={1} max={999999999} precision={2} style={{width:130}}></InputNumber>
            </FormItem>

            <FormItem 
              name="status"
              label="status"
              rules={[{
                  required: true,
                  message: "Please select the status of this flight!"
              }]}>
              <Select >{optionsData}</Select>
            </FormItem>

            <FormItem 
              name="airplaneId"
              label="Airplane Id"
              rules={[{
                  required: true,
                  message: "Please select the airplane id for this flight!"
              }]}>
              <Input placeholder="e.g. A380"></Input>
            </FormItem>


          </>
        );
      };

      const renderFooter = () => {
        return (
          <>
            <Button onClick={() => handleCreateModalVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={() => handleNext()}>
              Submit
            </Button>
          </>
        );
      };

    return (
        <Modal
      destroyOnClose
      title="Add Flight"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={renderFooter()}
      
    >
      {/* {props.children} */}

      <Form
          {...formLayout}
          form={form}
          name="flight"
          className="flight-form"
        >{renderContent()}
        </Form>

    </Modal>
    )



}