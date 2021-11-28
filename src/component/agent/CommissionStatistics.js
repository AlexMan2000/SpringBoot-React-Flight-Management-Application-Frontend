import {DatePicker, Statistic, Card, Space} from "antd";
import React, {useEffect, useState} from "react";
//后续可通过moment()获取当前的时间
import moment from "moment";
import axios from "axios";

axios.defaults.timeout = 1000;
const {RangePicker} = DatePicker;

export default function CommissionStatistics() {
    const [commissionData, setCommissionData] = useState(null);
    const [avgcommissionData,setAvgCommissionData] = useState(null);
    const [totalTickets,setTotalTickets] = useState(null);

    const handleDateRangeChange = (value,dateString) => {
        console.log(value);
        // console.log(dateString);
        axios({
            url:"http://localhost:8080/bookingAgent/getCommissionInfo",
            method:"GET",
            params:{
                email:"cathayEmp01@csair.com",
                startDate:new Date(value[0]),
                endDate:new Date(value[1])
            }
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                 setCommissionData(response.data.commissionFees);
                 setAvgCommissionData(response.data.averageCommissionFees);
                 setTotalTickets(response.data.ticketBooked);
            }
        }).catch(function(){
            setCommissionData(99999);
            setAvgCommissionData(90909);
            setTotalTickets(12313213);
        })
     

       
    }

    const loadingHolder = Boolean(commissionData);
    const loadingHolderForAvg = Boolean(avgcommissionData);
    const loadingHolderForTickets = Boolean(totalTickets);

    useEffect(() => {
        axios({
            url:"http://localhost:8080/bookingAgent/getCommissionInfo",
            method:"GET",
            params:{
                email:"cathayEmp01@csair.com",
                startDate:new Date(moment().subtract(30, 'days')),
                endDate:new Date(moment())
            }
        }).then(function(response){
            if(response.data){
                console.log(response.data);
                 setCommissionData(response.data.commissionFees);
                 setAvgCommissionData(response.data.averageCommissionFees);
                 setTotalTickets(response.data.ticketBooked);
            }
        })
    }, []);

    return (
        <Card title="Checking Total Commission for Username">
            <Space direction="vertical" size='large' style={{width: '100%'}}>
                <RangePicker
                    onChange={handleDateRangeChange}
                    defaultValue={[moment().subtract(30, 'days'), moment()]}
                />
                <div style={{textAlign: 'center', width: '100%'}}>
                    <Statistic
                        title="Total Commission in (USD)"
                        value={commissionData}
                        loading={!loadingHolder}
                        precision={2}
                        style={{width: '100%'}}
                    />
                    <Statistic
                        title="Average Commission in (USD)"
                        value={avgcommissionData}
                        loading={!loadingHolderForAvg}
                        precision={2}
                        style={{width: '100%'}}
                    />
                    <Statistic
                        title="Total Tickets Booked On Behalf of the customer"
                        value={totalTickets}
                        loading={!loadingHolderForTickets}
                        style={{width: '100%'}}
                    />
                </div>
            </Space>
        </Card>
    )

}