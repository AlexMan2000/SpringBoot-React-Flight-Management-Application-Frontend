import {Card, Form, Input, Button,Table,DatePicker,Space,message} from 'antd';
import { Column } from '@ant-design/charts';
import React, {useState,useEffect,useRef} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

export default function TopDestinations(){
    const [data,setData]=useState([]);
    const [startDate,setStartDate]=useState(undefined);
    const [endDate,setEndDate] = useState(undefined);
    const past = useRef("year");

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{
      getDestinationData("year");
    },[]);

    const tabList = [
        {key: 'sales', tab: 'Sales Report'},
    ]

    const getDestinationData = (past)=>{
      axios.get("http://localhost:8080/airlineStaff/topDestinations",
      {
        params:{
          past:past,
        }
      }).then(function(response){
          message.success("数据加载成功");
          console.log(response.data);
          const dataMap = response.data.map((item)=>({type:item.type,value:item.value}))
          console.log(dataMap);
          setData(dataMap);

      }).catch(function(){
          message.error("访问超时，使用默认数据");
          setData(sampleData);
      })
    }

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
        data: data,
        xField: 'type',
        yField: 'value',
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
        past.current = "year";
        getDestinationData("year");
      }

      const renderLast3Month = ()=>{
        past.current = "3 months";
        getDestinationData("month");

      }

      const renderTabExtra = ()=>{


        return (
            <Space direction="horizontal" size={12}>
            <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
            <Button onClick={renderLast3Month} type={"primary"}>Last 3 Months</Button>
            <RangePicker picker="day"></RangePicker></Space>
        )
      }



      return (
      <Card title={"Top Destinations in the last"+ past.current}
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}
      >
      <Column {...config} /></Card>);
}