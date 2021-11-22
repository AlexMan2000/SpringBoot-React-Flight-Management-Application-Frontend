import {CarryOutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const {SubMenu} = Menu;

export default function AgentSidebar({updateSelection,setActionType,setFlightResult}) {
    const tagList = {
        "1": "Search flights",
        "2": "Create order",
        "3": "My customer orders",
        "4": "Commission statistics",
        "5": "Top customers",
        "6": "Logout"
    }
    const navigate = useNavigate();

    
    const actionTypeMapping={
        "1":"search",
        "2":"purchase",
        "3":"view"
    }

    const handleSidebarClick = (item) => {
        if (tagList[item.key] == "Logout") {
            // clear local account information
            navigate("/", {replace: true})
        }
        updateSelection(tagList[item.key]);
        setFlightResult(null);
        setActionType(actionTypeMapping[item.key]);

    }

    useEffect(() => {
        updateSelection("Commission statistics")
    }, [])

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['4']}
            defaultOpenKeys={['sub2']}
            onClick={handleSidebarClick}
            style={{height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Booking">
                <Menu.Item key="1">{tagList['1']}</Menu.Item>
                <Menu.Item key="2">{tagList['2']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Mine">
                <Menu.Item key="3">{tagList['3']}</Menu.Item>
                <Menu.Item key="4">{tagList['4']}</Menu.Item>
                <Menu.Item key="5">{tagList['5']}</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Operation">
                <Menu.Item key="6">{tagList['6']}</Menu.Item>
            </SubMenu>
        </Menu>
    )
}