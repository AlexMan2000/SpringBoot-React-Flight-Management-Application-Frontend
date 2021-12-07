import React, {useEffect, useState,useRef} from "react"
import {Layout, Menu, Breadcrumb,Dropdown,Avatar,Button,Space,Modal,List,message} from "antd";
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
import axios from "axios";
import LoginCard from "../component/login/LoginCard";
import RegisterCard from "../component/login/RegisterCard";
import cookie from 'react-cookies'
import Cookies from "js-cookie"

const {Header, Content, Sider, Footer} = Layout;
const {SubMenu} = Menu;

// 这里是为了能够成功设置上Cookies
axios.defaults.withCredentials = true;

export default function UserPage({initializingTab}) {
    let navigate = useNavigate();

    const [navigateBar, setNavigateBar] = useState("customer");
    const [sidebar, setSidebar] = useState("");
    const [collapsed,setCollapsed] =useState(false);
    const [flightsResult, setFlightResult] = useState(null);
    const [actionType,setActionType] = useState("");
    const [loginModalVisible,setLoginModalVisible] = useState(false);
    const [infoModalVisible,setInfoModalVisible] = useState(false);
    const [registerModalVisible,setRegisterModalVisible] = useState(false);
    const [initializeType,setInitializeType] = useState("customer");
    const [registerLoginValue,setRegisterLoginValue] = useState(undefined);
    const defaultData = useRef(null);
    // 在全局记录用户的登录信息(简单实现)
    const loginInfo = useRef(null);

    useEffect(()=>{
        setNavigateBar(initializingTab)
        axios({
            url:"http://localhost:8080/index/findAllFlights",
            method:"GET",
        }).then(function(response){
            if(response.data){
                // console.log("haha");
                defaultData.current = response.data;
                // console.log(defaultData.current);
                setFlightResult(defaultData.current);
            }else{
                console.log("No Results");
            }
        }).catch(function(response){
            console.log("haha");
        })
    },["default"])

    // 如果用户尚未登录
    useEffect(()=>{
        
        axios({
            url:"http://localhost:8080/login/token",
            method:"POST",
        }).then(function(response){
            if(response.data){

                if(response.data.status==true){
                    const userType = response.data.userType;
                    if(userType==="staff"){
                        const name = response.data.airlineStaff.username;
                        const infoMap = {alias:name,...response.data.airlineStaff}
                         loginInfo.current = infoMap;
                         message.success("Welcome Back, "+name);
                         navigate("/staff",{replace:true})
                    }else if(userType==="customer"){
                        const name = response.data.customer.name;
                        const infoMap = {alias:name,...response.data.customer}
                         loginInfo.current = infoMap;
                         message.success("Welcome Back, "+name);
                         navigate("/customer",{replace:true})
                    }else if(userType==="agent"){
                        const email = response.data.bookingAgent.email;
                         const infoMap = {alias:email,...response.data.bookingAgent}
                         loginInfo.current = infoMap;
                         message.success("Welcome Back, "+email);
                         navigate("/agent",{replace:true})
                    }

                    setNavigateBar(userType);
                }
            }
            else{
            //     // setNavigateBar("global");
               
                message.destroy();
                message.error("您尚未登录");
                setNavigateBar("global");
                navigate("/global",{replace:true})
            }
            
        }).catch(function(response){
            message.destroy();
           
            message.error("Backend Server not started!");
        })
    },[1])
  

    console.log(loginInfo);

    const handleNavigateBar = (page) => {
        setNavigateBar(page.key);
        navigate("/" + page.key, {replace: true});
    }

    const sidebarList = {
        customer: <CustomerSidebar loginInfo={loginInfo} updateSelection={setSidebar} setActionType={setActionType} defaultData={defaultData} setFlightResult={setFlightResult} />,
        agent: <AgentSidebar loginInfo={loginInfo} updateSelection={setSidebar} setActionType={setActionType} defaultData={defaultData} setFlightResult={setFlightResult}/>,
        staff: <StaffSidebar loginInfo={loginInfo} updateSelection={setSidebar} setActionType={setActionType}  setFlightResult={setFlightResult}/>,
        global: <GlobalSidebar loginInfo={loginInfo} updateSelection={setSidebar} setActionType={setActionType}  setFlightResult={setFlightResult}/>,
    }


    const userContent = {
        "Flight CRUD":<FlightCRUD loginInfo={loginInfo}/>,
        "My flights": <SearchFlights setNavigateBar={setNavigateBar} loginInfo={loginInfo} userType={navigateBar} actionTab={"view"} 
                                    flightsResult={flightsResult} 
                                    setFlightResult={setFlightResult} 
                                    actionType={actionType}/>,
        "Search flights": <SearchFlights setNavigateBar={setNavigateBar} userType={navigateBar} 
                                        loginInfo={loginInfo} 
                                        actionTab={"search"} 
                                        flightsResult={flightsResult} 
                                        setFlightResult={setFlightResult} 
                                        actionType={actionType}/>,
        "Purchase tickets": <SearchFlights setNavigateBar={setNavigateBar}
                                            userType={navigateBar} 
                                           loginInfo={loginInfo} 
                                           actionTab={"purchase"} 
                                           flightsResult={flightsResult} 
                                           setFlightResult={setFlightResult} 
                                           actionType={actionType}/>,
        "Track spending": <SpendingChart loginInfo={loginInfo}/>,
        "Top customers": <TopCustomerChart loginInfo={loginInfo}/>,
        "Create order": <SearchFlights setNavigateBar={setNavigateBar}
                                       userType={navigateBar}
                                       loginInfo={loginInfo}  
                                       actionTab={"purchase"} 
                                       flightsResult={flightsResult}
                                       setFlightResult={setFlightResult}
                                       actionType={actionType}/>,
        "My customer orders": <SearchFlights setNavigateBar={setNavigateBar}
                                            userType={navigateBar} 
                                            loginInfo={loginInfo} 
                                            actionTab={"search"} 
                                            flightsResult={flightsResult} 
                                            setFlightResult={setFlightResult} 
                                            actionType={actionType}/>,
        "Commission statistics": <CommissionStatistics loginInfo={loginInfo}/>,
        "Add airport": <EditAirport loginInfo={loginInfo}/>,
        "Add airplane": <EditAirplane loginInfo={loginInfo}/>,
        "Add booking agent":<AddAgents loginInfo={loginInfo}/>,
        "View Agents":<ViewAgents loginInfo={loginInfo} />,
        "View Reports":<ViewReports setNavigateBar={setNavigateBar} loginInfo={loginInfo}/>,
        "Top destinations":<TopDestinations/>,
        "Revenue Comparison":<RevenueComparison loginInfo={loginInfo}/>,
        "Frequent customers":<ViewFrequent loginInfo={loginInfo}/>,
        "Grant permission":<GrantPermission loginInfo={loginInfo}/>
    }

    const menu = (<Menu>
        {!loginInfo.current&&(
        <Menu.Item icon={<SettingOutlined />}>
          <a onClick={()=>{setLoginModalVisible(true);}}>Log In</a>
          
        </Menu.Item>)}
        {loginInfo.current&&(<Menu.Item icon={<UserOutlined/>}>
        <a onClick={()=>{setInfoModalVisible(true)}}>Account Information</a>
        </Menu.Item>)}
      </Menu>);

    const onCancelLogin = ()=>{
        setLoginModalVisible(false);
    }

    const onCancelRegister =()=>{
        setRegisterModalVisible(false);
    }

    const onCancelInfo = ()=>{
        setInfoModalVisible(false);
    }


    const customerList=[
        {
            title:"Email",
            description:loginInfo.current?loginInfo.current.email:""
        },
        {
            title:"Name",
            description:loginInfo.current?loginInfo.current.name:""
        }
    ]

    const AgentList=[
        {
            title:"Email",
            description:loginInfo.current?loginInfo.current.email:""
        },
        {
            title:"Your Id",
            description:loginInfo.current?loginInfo.current.bookingAgentId:""
        }
    ]


    const staffList=[
        {
            title:"User Name",
            description:loginInfo.current?loginInfo.current.username:""
        },
        {
            title:"First Name",
            description:loginInfo.current?loginInfo.current.firstName:"",
        },
        {
            title:"Last Name",
            description:loginInfo.current?loginInfo.current.lastName:"",
        },
        {
            title:"Permission Level",
            description:loginInfo.current?loginInfo.current.permissionDescription?loginInfo.current.permissionDescription.join(", "):"":""
        },
        {
            title:"Airline",
            description:loginInfo.current?loginInfo.current.airlineName:""
        }
    ]

    const sampleInfoData = [
        {
            title:"User Name",
            description:"HaHaHa"
        },
        {
            title:"Airline",
            description:"Spring Airlines"
        },
        {
            title:"Permission Level",
            description: ["Admin","Operator"].join(", ")
        },

    ]

    return (

        <Layout>
            <Modal 
                destroyOnClose
                title="Account Information"
                visible={infoModalVisible}
                onCancel={() => {onCancelInfo()}}
                footer={[]}>
                    <List 
                    itemtlayout = {"horizontal"}
                    dataSource={loginInfo.current?navigateBar==="customer"?customerList:navigateBar==="staff"?staffList:AgentList:[{}]}
                    renderItem={item=>
                    (<List.Item
                        >
                        <List.Item.Meta
                        title={item.title}
                        description={item.description}>

                        </List.Item.Meta>
                    </List.Item>)}>
                    </List>

                </Modal>
            {<Modal 
                destroyOnClose
                title="Login"
                visible={loginModalVisible}
                onCancel={() => {onCancelLogin()}}
                footer={[]}
                >
                <LoginCard loginInfo={loginInfo} registerLoginValue={registerLoginValue} setRegisterLoginValue={setRegisterLoginValue} setInitializeType={setInitializeType}  setLoginModalVisible={setLoginModalVisible} setNavigateBar={setNavigateBar} setRegisterModalVisible={setRegisterModalVisible}/>
            </Modal>}
            {<Modal 
                destroyOnClose
                title="Login"
                visible={registerModalVisible}
                onCancel={() => {onCancelRegister()}}
                footer={[]}
                >
                <RegisterCard initializeType={initializeType} setRegisterLoginValue={setRegisterLoginValue}  setNavigateBar={setNavigateBar} setRegisterModalVisible={setRegisterModalVisible} />
            </Modal>}
            <Header className={"header"} style={{position: 'fixed', zIndex: 2, width: '100%'}}>
                
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[initializingTab]}
                    selectedKeys={[navigateBar]}
                    // onClick={handleNavigateBar}
                    style={{marginLeft:"100px"}}
                >
                    <Menu.Item key="customer">Customer</Menu.Item>
                    <Menu.Item key="agent">Agent</Menu.Item>
                    <Menu.Item key="staff">Staff</Menu.Item>
                    <Menu.Item key="global">Global</Menu.Item>
                    
                </Menu>
                
            </Header>
            <Dropdown overlay={menu}>
                    {
                    loginInfo.current?<Avatar style={{marginLeft:"1200px",zIndex:3,position: 'fixed',top:"10px", color: '#f56a00', backgroundColor: '#fde3cf' }} size="large"  
                    // src={"https://joeschmoe.io/api/v1/"+loginInfo.current?loginInfo.current.alias:null} 
                    >
                    {loginInfo.current?loginInfo.current.alias[0].toUpperCase():null}</Avatar>:
                    <Avatar style={{marginLeft:"1200px",zIndex:3,position: 'fixed',top:"10px"}} size="large" icon={<UserOutlined />}></Avatar>}
                </Dropdown>
            <Layout style={{minHeight: '91vh', marginTop: 64}}>
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
                    <Layout style={{textAlign: 'center', marginBottom: 0}}>
                <Footer>
                    2021 Global Airline All rights reserved.
                </Footer>
            </Layout>
                </Layout>
               

            </Layout>
           

        </Layout>
    )
}