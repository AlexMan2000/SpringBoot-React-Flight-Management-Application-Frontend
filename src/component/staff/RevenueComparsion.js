import {Card, Form, Input, Button,Table,DatePicker,Space} from 'antd';
import { Pie } from '@ant-design/charts';
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

export default function RevenueComparison(){

    const [data,setData]=useState();
    const [startDate,setStartDate]=useState(undefined);
    const [endDate,setEndDate] = useState(undefined);

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{},[]);

    const tabList = [
        {key: 'revenue', tab: 'Revenue Comparison'},
    ]

    var sampleData = [
        {
          type: '分类一',
          value: 27,
        },
        {
          type: '分类二',
          value: 25,
        },
        {
          type: '分类三',
          value: 18,
        },
        {
          type: '分类四',
          value: 15,
        },
        {
          type: '分类五',
          value: 10,
        },
        {
          type: '其他',
          value: 5,
        },
      ];
      var config = {
        appendPadding: 10,
        data: sampleData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
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
            <RangePicker picker="day"></RangePicker></Space>
        )
      }


      return (
      <Card title="Here is the brief report"
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}>
        <Pie {...config} />
      </Card>);
}