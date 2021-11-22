import React, {useEffect, useState} from "react"
import {Layout, Menu, Breadcrumb} from "antd";
import {CarryOutOutlined, SendOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CustomerSidebar from "../component/customer/CustomerSidebar";
import ViewFlights from "../component/flight/ViewFlights";
import SearchFlights from "../component/flight/SearchFlights";
import PurchaseTicket from "../component/customer/PurchaseTicket";
import SpendingChart from "../component/customer/SpendingChart";
import AgentSidebar from "../component/agent/AgentSidebar";
import TopCustomerChart from "../component/agent/TopCustomerChart";
import CustomerOrders from "../component/agent/CustomerOrders";
import CommissionStatistics from "../component/agent/CommissionStatistics";
import StaffSidebar from "../component/staff/StaffSidebar";
import EditAirport from "../component/staff/EditAirport";
import EditAirplane from "../component/staff/EditAirplane";
import GlobalSidebar from "../component/global/GlobalSidebar";
import FlightCRUD from "../component/staff/FlightCRUD";
import ViewAgents from "../component/staff/ViewAgents"
import ViewReports from "../component/staff/ViewReports";
import TopDestinations from "../component/staff/TopDestinations";
import RevenueComparison from "../component/staff/RevenueComparsion";
import ViewFrequent from "../component/staff/ViewFrequent";
import AddAgents from "../component/staff/AddAgents";
import GrantPermission from "../component/staff/GrantPermission";

const {Header, Content, Sider, Footer} = Layout;
const {SubMenu} = Menu;

export default function UserPage({initializingTab,loginInfo}) {
    let navigate = useNavigate();

    const [navigateBar, setNavigateBar] = useState("customer");
    const [sidebar, setSidebar] = useState("");
    const [collapsed,setCollapsed] =useState(false);
    const [flightsResult, setFlightResult] = useState(null);
    const [actionType,setActionType] = useState("");

    const handleNavigateBar = (page) => {
        setNavigateBar(page.key);
        navigate("/" + page.key, {replace: true});
    }

    const sidebarList = {
        customer: <CustomerSidebar updateSelection={setSidebar} setActionType={setActionType} setFlightResult={setFlightResult} />,
        agent: <AgentSidebar updateSelection={setSidebar} setActionType={setActionType}  setFlightResult={setFlightResult}/>,
        staff: <StaffSidebar updateSelection={setSidebar} setActionType={setActionType}  setFlightResult={setFlightResult}/>,
        global: <GlobalSidebar updateSelection={setSidebar} setActionType={setActionType}  setFlightResult={setFlightResult}/>,
    }


    const userContent = {
        "Flight CRUD":<FlightCRUD/>,
        "My flights": <SearchFlights userType={initializingTab} actionTab={"view"} 
                                    flightsResult={flightsResult} 
                                    setFlightResult={setFlightResult} 
                                    actionType={actionType}/>,
        "Search flights": <SearchFlights userType={initializingTab} 
                                        loginInfo={loginInfo} 
                                        actionTab={"search"} 
                                        flightsResult={flightsResult} 
                                        setFlightResult={setFlightResult} 
                                        actionType={actionType}/>,
        "Purchase tickets": <SearchFlights userType={initializingTab} 
                                           loginInfo={loginInfo} 
                                           actionTab={"purchase"} 
                                           flightsResult={flightsResult} 
                                           setFlightResult={setFlightResult} 
                                           actionType={actionType}/>,
        "Track spending": <SpendingChart />,
        "Top customers": <TopCustomerChart />,
        "Create order": <SearchFlights userType={initializingTab}
                                       loginInfo={loginInfo}  
                                       actionTab={"purchase"} 
                                       flightsResult={flightsResult}
                                       setFlightResult={setFlightResult}
                                       actionType={actionType}/>,
        "My customer orders": <SearchFlights userType={initializingTab} 
                                            loginInfo={loginInfo} 
                                            actionTab={"search"} 
                                            flightsResult={flightsResult} 
                                            setFlightResult={setFlightResult} 
                                            actionType={actionType}/>,
        "Commission statistics": <CommissionStatistics />,
        "Add airport": <EditAirport />,
        "Add airplane": <EditAirplane/>,
        "Add booking agent":<AddAgents/>,
        "View Agents":<ViewAgents />,
        "View Reports":<ViewReports/>,
        "Top destinations":<TopDestinations/>,
        "Revenue Comparison":<RevenueComparison/>,
        "Frequent customers":<ViewFrequent/>,
        "Grant permission":<GrantPermission/>
    }

    useEffect(() => {
        setNavigateBar(initializingTab)
    }, [])

    return (
        <Layout>
            <Header className={"header"} style={{position: 'fixed', zIndex: 2, width: '100%'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[initializingTab]}
                    selectedKeys={[navigateBar]}
                    onClick={handleNavigateBar}
                    style={{maginLeft:"300px"}}
                >
                    <Menu.Item key="customer">Customer</Menu.Item>
                    <Menu.Item key="agent">Agent</Menu.Item>
                    <Menu.Item key="staff">Staff</Menu.Item>
                    <Menu.Item key="global">Global</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{minHeight: '100vh', marginTop: 64}}>
                <Sider width={250} height={100} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                    {sidebarList[navigateBar]}
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{navigateBar.charAt(0).toUpperCase() + navigateBar.slice(1)}</Breadcrumb.Item>
                        <Breadcrumb.Item>{sidebar}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{padding: 24, margin: 0}}
                    >
                        {userContent[sidebar]}
                    </Content>
                </Layout>
            </Layout>
            <Layout style={{textAlign: 'center', marginBottom: 0}}>
                <Footer>
                    2021 Global Airline All rights reserved.
                </Footer>
            </Layout>

        </Layout>
    )
}