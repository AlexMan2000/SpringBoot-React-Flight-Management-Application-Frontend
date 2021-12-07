import React, { useState } from 'react';
import { Table, Select,Form, Button, Input, Modal, DatePicker, InputNumber, message} from 'antd';
import { render } from '@testing-library/react';
import moment from "moment";
import axios from "axios";
import { ContinuousLegend } from '@antv/g2/lib/dependents';

export default function DetailsTable(props){
    const {detailModalVisible,onCancel,handleDetailModalVisible,values} = props;

    console.log(values);
    
    // const dataSource = [{
    //     email:"asda",
    //     name:"Jack",
    //     building_num:"No.10",
    //     street:"Baker Street",
    //     city:"NYC",
    //     state:"USA",
    //     phone:"1231231234",
    //     passportNumber:"E1231414",
    //     passportExpiration:"2029-10-21",
    //     passportCountry:"China",
    //     birthday:"1999-02-02"
    // }]

    const dataSource = values.passengers;
    const dataMap = dataSource.map((item)=>{
        return ({
            email:item.email,
            name:item.name,
            buildingNumber:item.buildingNumber,
            street:item.street,
            city:item.city,
            livingState:item.livingState,
            phoneNumber:item.phoneNumber,
            passportExpiration:moment(item.passportExpiration).format("yyyy-MM-DD"),
            passportCountry:item.passportCountry,
            passportNumber:item.passportNumber,
            birthday:moment(item.birthday).format("yyyy-MM-DD")
        })
    })

    const columns=[
        {
            title:"Email",
            dataIndex:"email",
            key:"email",
            textWrap:"word-break",
            width:150,
            ellipsis:true,
            fixed:"left"
        },{
            title:"Name",
            dataIndex:"name",
            key:"name",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            
        },
        {
            title:"Building Number",
            dataIndex:"buildingNumber",
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
            dataIndex:"livingState",
            key:"state"
        },{
            title:"Phone No.",
            dataIndex:"phoneNumber",
            key:"phone",
            textWrap:"word-break",
            width:150,
            ellipsis:true,
        },{
            title:"Passport No.",
            dataIndex:"passportNumber",
            key:"passportnum"
        },{
            title:"Passport Exp.",
            dataIndex:"passportExpiration",
            key:"passportexp",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
        },{
            title:"Passport Country",
            dataIndex:"passportCountry",
            key:"passportCountry"
        },{
            title:"Birthday",
            dataIndex:"birthday",
            key:"birthday",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
        }

    ]


    return (
    <>
    <Modal 
    destroyOnClose
      title="Customer Details"
      visible={detailModalVisible}
      onCancel={() => onCancel()}
      width={1300}
      footer={[]}
      >
    <Table scroll={{x:1300}} columns={columns} dataSource={dataMap}>

    </Table></Modal></>
    )
}