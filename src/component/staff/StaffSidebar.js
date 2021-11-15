import {CarryOutOutlined, FundViewOutlined, SendOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const {SubMenu} = Menu;

export default function StaffSidebar({updateSelection}) {
    const tagList = {
        // Flight Management
        "1": "View flights",
        "2": "Flight CRUD",
        "4": "Add airplane",
        "5": "Add airport",
        // Statistics
        "3": "View Agents",
        "6": "Frequent customers",
        "7": "Revenue Comparison",
        "8": "Top destinations",
        "9": "View Reports",
        // Operation
        "10": "Add booking agent",
        "11": "Grant permission",
        "12": "Logout",

    }
    const navigate = useNavigate();

    const handleSidebarClick = (item) => {
        if (tagList[item.key] == "Logout") {
            // clear local account information
            navigate("/", {replace: true})
        }
        console.log(item);
        updateSelection(tagList[item.key])
    }

    useEffect(() => {
        updateSelection("Sale report");
    }, [])

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['9']}
            defaultOpenKeys={['sub2']}
            onClick={handleSidebarClick}
            style={{height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" icon={<SendOutlined />} title="Flight Management">
                <Menu.Item key="1">{tagList['1']}</Menu.Item>
                <Menu.Item key="2">{tagList['2']}</Menu.Item>
                <Menu.Item key="4">{tagList['4']}</Menu.Item>
                <Menu.Item key="5" disabled={false}>{tagList['5']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FundViewOutlined />} title="Statistics">
                <Menu.Item key="3">{tagList['3']}</Menu.Item>
                <Menu.Item key="6">{tagList['6']}</Menu.Item>
                <Menu.Item key="7">{tagList['7']}</Menu.Item>
                <Menu.Item key="8">{tagList['8']}</Menu.Item>
                <Menu.Item key="9">{tagList['9']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Operation">
                <Menu.Item key="10" disabled={true}>{tagList['10']}</Menu.Item>
                <Menu.Item key="11">{tagList['11']}</Menu.Item>
                <Menu.Item key="12">{tagList['12']}</Menu.Item>
            </SubMenu>
        </Menu>
    )
}