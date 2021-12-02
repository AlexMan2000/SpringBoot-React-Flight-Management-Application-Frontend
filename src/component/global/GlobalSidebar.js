import {CarryOutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu,Avatar} from "antd";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import cookie from 'react-cookies'
import { countDownAnony } from "../login/LoginOut";

const {SubMenu} = Menu;

export default function GlobalSidebar({updateSelection}){
    const tagList = {
        "1": "Search flights",
        "2": "Exit the System",
    }
    const navigate = useNavigate();

    const handleSidebarClick = (item) => {
        if (tagList[item.key] == "Exit the System") {
            // Say goodbye!
            countDownAnony();
            //Todo
            cookie.remove("JSESSIONID");
            navigate("/", {replace: true})
        }
        updateSelection(tagList[item.key])
    }

    useEffect(() => {
        updateSelection("Search flights")
    }, [])

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={handleSidebarClick}
            style={{height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Operation">
                <Menu.Item key="1">{tagList['1']}</Menu.Item>
                <Menu.Item key="2">{tagList['2']}</Menu.Item>
            </SubMenu>
        </Menu>
    )
}