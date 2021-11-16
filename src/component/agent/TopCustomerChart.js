import React, {useState} from "react";
import {Column} from "@ant-design/charts";
import {Card, Divider, Typography,InputNumber} from "antd";
import { useEffect } from "react/cjs/react.development";

const {Title} = Typography;

export default function TopCustomerChart() {
    const [customerTicketCount, setCustomerTicketCount] = useState(null);
    const [customerCommission, setCustomerCommission] = useState(null);
    const [activeTab,setActiveTab] = useState("tickets");
    const [data,setData]=useState([]);
    const [topK,setTopK] = useState(5);

    const tabList = [
        {key: 'tickets', tab: 'Tickets Ranking'},
        {key: 'commission', tab: 'Commission Ranking'},
    ]

    useEffect((()=>{
        setData(testTicket);
    }))


    // for testing ONLY
    const testTicket = [
        {
            uid: "123",
            sum: 15,
        },
        {
            uid: "234",
            sum: 11,
        },
        {
            uid: "471",
            sum: 9,
        },
        {
            uid: "602",
            sum: 7,
        },
        {
            uid: "866",
            sum: 5,
        },
    ];
    const testCommission = [
        {
            uid: "123",
            sum: 9806.3,
        },
        {
            uid: "234",
            sum: 7503.5,
        },
        {
            uid: "471",
            sum: 6602.6,
        },
        {
            uid: "602",
            sum: 1025.2,
        },
        {
            uid: "866",
            sum: 897.8,
        },
    ]

    const columnConfig = {
        xField: 'uid',
        yField: 'sum',
        seriesField: '',
        columnWidthRatio: 0.5,
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.8
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            }
        },
    }


    const onTabChange = (key)=>{
        setActiveTab(key);
        if(key==="tickets"){
            setData(testTicket);
        }else{
            setData(testCommission);
        }
    }

    const onNumberChange=(value)=>{
        //更新图标
        setTopK(value);
    }
    

    return (
        <Card title="Customer Statistics"
              tabList={tabList}
              activeTab={activeTab}
        onTabChange={onTabChange}
        tabBarExtraContent={<><span style={{marginRight:5}}>Top</span><InputNumber min={1} onChange={onNumberChange} defaultValue={5}></InputNumber><span style={{marginLeft:5}}>Agents</span></>}
        >
            <Column {...columnConfig}
                    data={data.slice(0,topK)}
                    meta={{uid: {alias: 'User ID'}, sum: {alias:activeTab==="tickets"?'Ticket Number':'Total Commission'}}} />
        </Card>
    )
}