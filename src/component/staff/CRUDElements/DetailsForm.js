import React, { useState } from 'react';
import { Table, Select,Form, Button, Input, Modal, DatePicker, InputNumber, message} from 'antd';
import { render } from '@testing-library/react';
import moment from "moment";
import axios from "axios";

export default function DetailsTable(props){
    const {detailModalVisible,onCancel,handleDetailModalVisible,record} = props;

    console.log(record);
    const dataSource = [{
        email:"asda",
        name:"Jack",
        building_num:"No.10",
        street:"Baker Street",
        city:"NYC",
        state:"USA",
        phone:"1231231234",
        passportNumber:"E1231414",
        passportExpiration:"2029-10-21",
        passportCountry:"China",
        birthday:"1999-02-02"
    }]

    const columns=[
        {
            title:"Email",
            dataIndex:"email",
            key:"email"
        },{
            title:"Name",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Building Number",
            dataIndex:"building_num",
            key:"building"
        },
        {
            title:"Street",
            dataIndex:"street",
            key:"street"
        },
        {
            title:"City",
            dataIndex:"city",
            key:"city"
        },{
            title:"State",
            dataIndex:"state",
            key:"state"
        },{
            title:"Phone No.",
            dataIndex:"phone",
            key:"phone"
        },{
            title:"Passport No.",
            dataIndex:"passportNumber",
            key:"passportnum"
        },{
            title:"Passport Exp.",
            dataIndex:"passportExpiration",
            key:"passportexp"
        },{
            title:"Passport Country",
            dataIndex:"passportCountry",
            key:"passportCountry"
        },{
            title:"Birthday",
            dataIndex:"birthday",
            key:"birthday",
        }

    ]


    return (
    <>
    <Modal 
    destroyOnClose
      title="Customer Details"
      visible={detailModalVisible}
      onCancel={() => onCancel()}
      width={1000}
      footer={[]}
      >
    <Table columns={columns} dataSource={dataSource}>

    </Table></Modal></>
    )
}