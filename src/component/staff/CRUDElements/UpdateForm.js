import React, { useState } from 'react';
import { Select,Form, Button, Input, Modal, DatePicker, InputNumber, message} from 'antd';
import { render } from '@testing-library/react';
import moment from "moment";
import axios from "axios";
import { ConsoleSqlOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

export default function UpdateForm(props){
    const {onCancel,onSubmit,updateModalVisible,handleUpdateModalVisible,values,handleUpdate}=props;

    const [form] = Form.useForm();

    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

    const [formVals,setFormVals] = useState({
        ...props.values,
    });

    console.log(formVals);
    console.log(values);

    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({ ...formVals, ...fieldsValue});
        handleUpdate({ ...formVals, ...fieldsValue});
      };

      const renderContent = () => {
        return (
          <>
            <FormItem
              name="flightNum"
              label="Flight Number"
              rules={[{ required: true, message: 'Please input flight number!' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem
              name="airlineName"
              label="Airline Name"
              rules={[{ required: true, message: 'Please input airline name!' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
    
            {(<FormItem
              name="sourceAirportName"
              label="Departure Airport"
              rules={[{ required: true, message: 'Please Input Departure Airport' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>)}
            {/* {(<FormItem
            name="departureTime"
            label="Departure Time"
            rules={[{ required: true, message: 'Please input Departure Time' }]}
            >
            <DatePicker 
               format="YYYY-MM-DD HH:mm:ss"
              //  disabledDate={disabledDate}
               showTime={{format:"YYYY-MM-DD HH:mm:ss"}}></DatePicker>
            </FormItem>)} */}

            <FormItem
            name="destAirportName"
            label="Arrival Airport"
            rules={[{ required: true, message: 'Please input  Arrival Airport' }]}
            >
            <Input placeholder="请输入" />
            </FormItem>

            {/* <FormItem
            name="arrivalTime"
            label="Arrival Time"
            rules={[{ required: true, message: 'Please input Departure Time' }]}
            >
            <DatePicker 
               format="YYYY-MM-DD HH:mm:ss"
              //  disabledDate={disabledDate}
               showTime={{format:"YYYY-MM-DD HH:mm:ss"}}></DatePicker>
            </FormItem> */}

            <FormItem
            name="price"
            label="price"
            rules={[{ required: true, message: 'Please input the price' }]}
            >
            <Input placeholder="请输入" />
            </FormItem>
            <FormItem
            name="status"
            label="status"
            rules={[{ required: true, message: 'Please input the status' }]}
            >
            <Input placeholder="请输入" />
            </FormItem>
          </>
        );
      };
    
      const renderFooter = () => {
        return (
          <>
            <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
            <Button type="primary" onClick={() => handleNext()}>
              提交
            </Button>
          </>
        );
      };
  
    return (
    <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Update Flight"
        visible={updateModalVisible}
        footer={renderFooter()}
        onCancel={() => handleUpdateModalVisible()}
      >
  
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            flightNum: formVals.flight_id,
            airlineName: formVals.airline_name,
            sourceAirportName: formVals.dept,
            // departureTime:formVals.dept_time,
            destAirportName: formVals.arri,
            // arrivalTime:formVals.arri_time,
            price:formVals.price,
            status:formVals.status
          }}
        >
          {renderContent()}
        </Form>
      </Modal>)
}