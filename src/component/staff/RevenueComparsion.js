import {Card, Form, Input, Button,Table,DatePicker,Space,Statistic,message,Spin} from 'antd';
import { Pie } from '@ant-design/charts';
import React, {useState,useEffect,useRef} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SettingOutlined } from '@ant-design/icons';

axios.defaults.timeout = 1000;

export default function RevenueComparison(){

    const [data,setData]=useState(null);
    const [startDate,setStartDate]=useState(undefined);
    const [endDate,setEndDate] = useState(undefined);
    const [totalSales,setTotalSales] = useState(undefined);
    const past = useRef("year");

    const {RangePicker} = DatePicker;
    
    useEffect(()=>{
      getRevenueData("year","Spring Airlines");
    },[]);

    const getRevenueData = (value,airlineName)=>{
      axios.get("http://localhost:8080/airlineStaff/revenueComparison",
      {
        params:{
          past:value,
          airlineName:"Spring Airlines"
        }
      }).then(function(response){
          message.success("Data loaded!");
          const dataMap = response.data.map((item)=>({type:item.type,value:item.value}))
          const totalSales = dataMap.reduce(getSum,0);//这个零是初始化为零开始累加的意思
          setData(dataMap);
          setTotalSales(totalSales)

      }).catch(function(){
          message.error("访问超时，使用默认数据");
          setData(sampleData);
      })

    }


    const getSum = (total,num)=>{
      return total+num.value;
    }


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
        data: data,
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
        past.current = "year";
        getRevenueData("year","Spring Airlines");
    }

        const renderLastMonth = ()=>{
          past.current = "month";
          getRevenueData("month","Spring Airlines")

    }

    const loadingHolder = Boolean(data);

      const renderTabExtra = ()=>{


        return (
            <Space direction="horizontal" size={12}>
            <Button onClick={renderLastYear} type={"primary"}>Last Year</Button>
            <Button onClick={renderLastMonth} type={"primary"}>Last Month</Button>
            </Space>
        )
      }


      return (
      <Card title="Here is the brief report"
      tabList={tabList}
      hoverable={true}
      tabBarExtraContent={renderTabExtra()}>
      <Statistic title={"Total Sales in (USD) over the last "+past.current}
                        value={totalSales}
                        loading={!loadingHolder}
                        precision={2}
                        style={{width: '100%'}}></Statistic>
         {!data&&(<Spin size="large"></Spin>)}
       {data&&( <Pie {...config} />)}
      </Card>);
}