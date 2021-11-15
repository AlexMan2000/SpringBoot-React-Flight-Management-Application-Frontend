import {FlightsResultTable} from "../flight/SearchFlights";
import React, {useState} from "react";
import {Button, Card, DatePicker, Divider, Input, Select} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import {dateFormat} from "../../lib/dateFormat";

const {Option} = Select;

export default function PurchaseTicket() {
    // result body:
    // [{most match: city if city, airport if airport},
    // {cities if city, airports if airport}, ...,
    // {airports if city, cities if airport}, {}]

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today
    const [searchResult, setSearchResult] = useState([]);
    const [flightsResult, setFlightResult] = useState(null);
    const [flightID, setFlightID] = useState(undefined);

    //for testing ONLY
    const test = () => {setSearchResult(["Shanghai", "Shangrao", "Bashang", "SHA", "PVG", "SQD", "ZQZ"])};

    const options = searchResult.map(item => <Option key={item}>{item}</Option>);

    const handleSearch = (value) => {
        if (value) {
            setTimeout(test, 500);
        } else {
            setSearchResult([]);
        }
    }
    const handleChange = (callBack) => (value) => {
        callBack(value);
    }

    const swapDeptArri = () => {
        let tmp = deptAirport;
        setDeptAirport(arriAirport);
        setArriAirport(tmp);
    }

    const handleSearchFlights = () => {
        // search flights
        setFlightResult("testing");
    }

    const handleExactSearch = () => {
        setFlightResult("testing");
    }


    return (
        <Card title="Start planning your journey, Username!">
            <Input.Group>
                <b>From:</b>
                <Select
                    showSearch
                    addonBefore="From"
                    style={{width: 300, padding: 10}}
                    placeholder={"Departure Airport"}
                    value={deptAirport}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange(setDeptAirport)}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                <Button shape="circle" icon={<SwapOutlined />} onClick={swapDeptArri} />
                <b style={{paddingLeft: 10}}>To:</b>
                <Select
                    showSearch
                    addonBefore="To"
                    style={{width: 300, padding: 10}}
                    placeholder={"Arrival Airport"}
                    value={arriAirport}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange(setArriAirport)}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                <DatePicker format={dateFormat} onChange={handleChange(setDeptDate)} style={{width:200}} />
                <span style={{padding: 10}}> </span>
                <Button type="primary" onClick={handleSearchFlights}>Search</Button>
            </Input.Group>
            <p>Or use exact searching:</p>
            <Input
                addonBefore="Flight Number"
                placeholder="Airline Code + Digits"
                value={flightID}
                allowClear
                maxLength={6}
                style={{width: '50vw'}}
            />
            <b style={{padding: 10}}> </b>
            <Button type={"primary"} onClick={handleExactSearch}>Exact Searching</Button>

            <Divider />
            {flightsResult ? <FlightsResultTable data={flightsResult} /> : null}
        </Card>
    )
}