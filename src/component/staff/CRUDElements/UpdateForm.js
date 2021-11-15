import React, { useState } from 'react';
import { Form, Button, Input, Modal} from 'antd';

const FormItem = Form.Item;

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

export default function UpdateForm(props){
    const {onCancel,onSubmit,updateModalVisible,handleUpdateModalVisible,values,handleUpdate}=props;

    const [form] = Form.useForm();

    const [formVals,setFormVals] = useState({
        ...props.values,
    });

    console.log(props.values);
    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({ ...formVals, ...fieldsValue});
        handleUpdate({ ...formVals, ...fieldsValue});
      };

      const renderContent = () => {
        return (
          <>
            <FormItem
              name="url"
              label="api路径"
              rules={[{ required: true, message: '请输入url！' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem
              name="name"
              label="api描述"
              rules={[{ required: true, message: '请输入描述！' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
    
            {(<FormItem
              name="roles"
              label="权限"
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
            <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
            <Button type="primary" onClick={() => handleNext()}>
              提交
            </Button>
          </>
        );
      };
    

    console.log("haha");

    return (
    <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={renderFooter()}
        onCancel={() => handleUpdateModalVisible()}
      >
  
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            name: formVals.name,
            url: formVals.url,
            roles: formVals.roles,
            remark: formVals.remark,
          }}
        >
          {renderContent()}
        </Form>
      </Modal>)
}