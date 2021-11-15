import React, { useState } from 'react';
import { Form, Button, Input, Modal} from 'antd';
import { render } from '@testing-library/react';

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

const FormItem = Form.Item;



export default function CreateForm(props){
    const{modalVisible,onCancel,onSubmit,handleCreateModalVisible,handleCreate} = props;
    const[formVals,setFormVals] = useState({});

    const [form] = Form.useForm();
    
    console.log("CreateForm");

    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({ ...formVals, ...fieldsValue});
        handleCreate({ ...formVals, ...fieldsValue});
      };

    const renderContent = () => {
        return (
          <>
            <FormItem
              name="flightNumber"
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
    
            {(<FormItem
              name="departureAirport"
              label="Departure Airport"
              rules={[{ required: true, message: '输入权限！' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>)}
            {(<FormItem
            name="remark"
            label="请求模式"
            rules={[{ required: true, message: '输入请求模式！' }]}
            >
            <Input placeholder="请输入" />
            </FormItem>)}
          </>
        );
      };

      const renderFooter = () => {
        return (
          <>
            <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
            <Button type="primary" onClick={() => handleNext()}>
              提交
            </Button>
          </>
        );
      };

    return (
        <Modal
      destroyOnClose
      title="添加用户"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={renderFooter}
      
    >
      {/* {props.children} */}

      <Form
          {...formLayout}
          form={form}
          
        >{renderContent()}
        </Form>

    </Modal>
    )



}