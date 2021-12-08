import {Card, Form, Input, Button,Table,DatePicker,Space,message,Statistic} from 'antd';
import { Column } from '@ant-design/charts';
import React, {useState,useEffect,useRef} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';
import moment from "moment";
import cookie from 'react-cookies';
import {useNavigate} from "react-router-dom";

export default function ViewReports({loginInfo,setNavigateBar}){
    const [data,setData]=useState([]);
    const [totalSales,setTotalSales] = useState(undefined);
    const past = useRef("year");

    const originalData = useRef([]);

    const loadingHolder= Boolean(totalSales);
    const navigate = useNavigate();

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{
      // setData(sampleData);
      getData("Spring Airlines",null,null);
    },[]);

    const tabList = [
        {key: 'sales', tab: 'Sales Report'},
    ]


    const getData = (airlineName,startDate,endDate)=>{
      axios.get("http://localhost:8080/airlineStaff/viewReports",
      {
        params:{
          airlineName:loginInfo.current?loginInfo.current.airlineName:"Spring Airlines",
          startDate:startDate?new Date(startDate):null,
          endDate:endDate?new Date(endDate):null
        }
      }).then(function(response){
          if(response.data["statusCode"]==503){
            loginInfo.current = null;
                message.destroy();
                message.error("Session Expired!");
                cookie.remove("JSESSIONID");
                setNavigateBar("global");
                navigate("/global", {replace: true})
          }else{
          message.destroy();
          message.success("Data loaded!");
          const dataMap = response.data.map((item)=>({type:item.interval,sales:item.value}))
          const totalSales = dataMap.reduce(getSum,0);//这个零是初始化为零开始累加的意思
          originalData.current = dataMap;
          setData(dataMap);
          setTotalSales(totalSales);}
          

      }).catch(function(){
          message.error("Time out");
          originalData.current = sampleData;
          setData(sampleData);
      })
    }

    const getSum = (total,num)=>{
      return total+num.sales;
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
        const dataMap = originalData.current;
        const totalSales = dataMap.reduce(getSum,0);//这个零是初始化为零开始累加的意思
          setData(dataMap);
          setTotalSales(totalSales);  
               
        }

      const renderLastMonth = ()=>{
        const dataMap = originalData.current.slice(-1);
        setData(dataMap);
        setTotalSales(dataMap.sales);
      }

      const renderRange = (value)=>{
          if(value!=null){
          getData("",value[0],value[1]);}else{
            getData("",null,null);
          }

      }

      const renderTabExtra = ()=>{


        return (
            <Space direction="horizontal" size={12}>
            <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
            <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button>
            <RangePicker picker="month" onChange={renderRange}></RangePicker></Space>
        )
      }



      return (
      <Card title="Here is the sales report for the airline you work in."
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}
      >
      <Statistic title={"Total Number of sold tickets over the last "+past.current}
                        value={totalSales}
                        // loading={!loadingHolder}
                        precision={2}
                        style={{width: '100%'}}></Statistic>
      <Column {...config} /></Card>);
}