import {Card, Form, Input, Button,Table,DatePicker,Space,message} from 'antd';
import { Column } from '@ant-design/charts';
import React, {useState,useEffect} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

export default function ViewReports(){
    const [data,setData]=useState([]);
    const [startDate,setStartDate]=useState(undefined);
    const [endDate,setEndDate] = useState(undefined);

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{
      // setData(sampleData);
      getData();
    },[]);

    const tabList = [
        {key: 'sales', tab: 'Sales Report'},
    ]


    const getData = (airlineName)=>{
      axios.get("http://localhost:8080/airlineStaff/viewReports",
      {
        params:{
          airlineName:"Spring Airlines"
        }
      }).then(function(response){
          message.success("数据加载成功");
          console.log(response.data);
          // const dataMap = response.data.map((item)=>({type:item.type,value:item.value}))
          // const totalSales = dataMap.reduce(getSum,0);//这个零是初始化为零开始累加的意思
          // console.log(dataMap);
          // setData(dataMap);
          // setTotalSales(totalSales)

      }).catch(function(){
          message.error("访问超时，使用默认数据");

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
      <Card title="Here is the sales report for the airline you work in."
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}
      >
      <Column {...config} /></Card>);
}