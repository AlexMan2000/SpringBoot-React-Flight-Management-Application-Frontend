import {Card, Form, Input, Button,Table,DatePicker,Space} from 'antd';
import { Column } from '@ant-design/charts';
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

export default function ViewReports(){
    const [data,setData]=useState();
    const [startDate,setStartDate]=useState(undefined);
    const [endDate,setEndDate] = useState(undefined);

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{},[]);

    const tabList = [
        {key: 'sales', tab: 'Sales Report'},
    ]

    var sampleData = [
        {
          type: '家具家电',
          sales: 38,
        },
        {
          type: '粮油副食',
          sales: 52,
        },
        {
          type: '生鲜水果',
          sales: 61,
        },
        {
          type: '美容洗护',
          sales: 145,
        },
        {
          type: '母婴用品',
          sales: 48,
        },
        {
          type: '进口食品',
          sales: 38,
        },
        {
          type: '食品饮料',
          sales: 38,
        },
        {
          type: '家庭清洁',
          sales: 38,
        },
      ];
      var config = {
        data: sampleData,
        xField: 'type',
        yField: 'sales',
        label: {
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: { alias: '类别' },
          sales: { alias: '销售额' },
        },
      };


      const renderLastYear = ()=>{

      }

      const renderLastMonth = ()=>{


      }

      const renderTabExtra = ()=>{


        return (
            <Space direction="horizontal" size={12}>
            <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
            <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button>
            <RangePicker picker="month"></RangePicker></Space>
        )
      }



      return (
      <Card title="Here is the brief report"
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}
      >
      <Column {...config} /></Card>);
}