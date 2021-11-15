import {DatePicker, Statistic, Card, Space} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";

const {RangePicker} = DatePicker;

export default function CommissionStatistics() {
    const [commissionData, setCommissionData] = useState(null);

    const handleDateRangeChange = () => {
        setCommissionData(29056);
    }

    const loadingHolder = Boolean(commissionData);

    useEffect(() => {
        setTimeout(() => {setCommissionData(29056);}, 3000);
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
                        title="Total Commission in XXX (USD)"
                        value={commissionData}
                        loading={!loadingHolder}
                        precision={2}
                        style={{width: '100%'}}
                    />
                </div>
            </Space>
        </Card>
    )

}