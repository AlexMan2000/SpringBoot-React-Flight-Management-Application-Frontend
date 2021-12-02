import React,{useEffect,useState,useRef} from "react";
import moment from "moment";
import qs from "qs";
import axios from "axios";
import {dateFormat} from "../../lib/dateFormat";
import "antd/dist/antd.css";
import {v4 as uuidv4} from "uuid";
import ProTable from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {PlusOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Button, Space, Tag,Popconfirm, message,Tooltip} from "antd";
import { statusColor } from "../../lib/statusTag";
import CreateForm from "./CRUDElements/CreateForm";
import UpdateForm from "./CRUDElements/UpdateForm";
import DetailsTable from "./CRUDElements/DetailsForm";

export default function FlightCRUD({loginInfo}){

    //控制添加Modal的可视
    const [createModalVisible,handleCreateModalVisible] = useState(false);
    //控制更新Modal的可视，由于需要数据回显，故和createModal分开写
    const [updateModalVisible,handleUpdateModalVisible] = useState(false);
    const [detailModalVisible,handleDetailModalVisible] = useState(false);
    const [selectedRows,setSelectedRows] = useState([]);
    //设置回显的数据
    const [stepFormValues, setStepFormValues] = useState({});
    //用于判断是否能够多选
    const [radioValue, setRadioValue] = useState('read');
    //从后台api获取的数据
    const [apiData, setApiData] = useState([]);
    //全局变量，在整个生命周期都有效
    const actionRef = useRef();
    //全局变量，用于控制是否加载默认数据
    const defaultRef = useRef(true);

    console.log(loginInfo);//默认

    // const defaultLoginInfo = {
    //   permission:["Admin","Operator"]
    // }
    
    //异步方法提交数据, 注意这里返回一个异步函数
    const fetchFlightData = async (query)=>{
        return axios({
          url:"http://localhost:8080/airlineStaff/findAllFlightsForAirline",
          method:"GET",
          params:{
            airlineName:loginInfo.current?loginInfo.current.airlineName:"Spring Airlines"
          }
        }).then(function(response){
          if(response.data){
            console.log(response.data);
              defaultRef.current = false;
              return {"data":{...response.data},"success":true};
          }else{
             return {"data":{},"success":false};
          }
        }).catch(function(){
          console.log("返回默认数据")
          return {"data":dataSource,"success":true};
        })  
       
    }

    const fetchFilteredFlightData = async (query)=>{
      console.log(query);
      return axios({
        url:"http://localhost:8080/airlineStaff/findAllFilteredFlights",
        method:"POST",
        data:query
      }).then(function(response){
        if(response.data){
          console.log(response.data);
            return {"data":{...response.data},"success":true};
        }else{
           return {"data":{},"success":false};
        }
      }).catch(function(){
        console.log("返回默认数据")
        return {"data":dataSource,"success":true};
      })  
     
  }

    const dataSource = {
      "records":[
        {
          flightNum: "MU12243234",
          airlineName:"Cathay Pacific",
          sourceAirportName:"PVG",
          departureTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          destAirportName:"SZX",
          arrivalTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          price:3030,
          status:"on time",
          airplaneId:"MU888"
        },
        {
          flightNum: "MU1224",
          airlineName:"Cathay Pacific",
          sourceAirportName:"PVG",
          departureTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          destAirportName:"SZX",
          arrivalTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          price:3030,
          status:"on time",
          airplaneId:"MU888"
        },
        {
          flightNum: "MU234",
          airlineName:"Cathay Pacific",
          sourceAirportName:"PVG",
          departureTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          destAirportName:"SZX",
          arrivalTime:moment("2020-01-01").format("YYYY-MM-DD HH:mm:ss"),
          price:3030,
          status:"on time",
          airplaneId:"MU888"
        },
        
      ],"total":12,"success":true};


    const handleDelete= (flight_id,airline_name)=>{
        axios({
          url:"http://localhost:8080/airlineStaff/deleteFlight",
          method:"POST",
          data:qs.stringify({
            flightNum:flight_id,
            airlineName:airline_name
          })
        }).then(function(response){
          if(response.data){
            actionRef.current.reload();

        message.success("Click on Yes");
          }
        }).catch(function(response){
          message.success("Delete Failed");
        });
        
    }

    const handleUpdate = (flight_info)=>{
        console.log("update");
    }

    const handleUpdateMany =()=>{
      
    }

    //用于提交数据之后
    const handleCreate = (values)=>{
        axios({
          url:"http://localhost:8080/airlineStaff/addNewFlight",
          method:"post",
          data:{...values,
            departureTime:new Date(moment(values.departureTime)),
            arrivalTime:new Date(moment(values.arrivalTime))}
        }).then(function(response){
          if(response.data==="success"){
            message.success({
              content: 'Insertion Completed',
              className: 'custom-class',
              style: {
                marginTop: '40vh',
              },
            });
            handleCreateModalVisible(false);
            actionRef.current.reload();
          }else{
            message.error({
              content: 'You have already inserted this airplane information!',
              className: 'custom-class',
              style: {
                marginTop: '40vh',
              },
            });
          }
        })
        
    }

    const handleDetails =()=>{
        console.log("show info");
    }

    const confirm = (e,record)=>{
        handleDelete(record.flightNum,record.airlineName);
    }

    const cancel = (e)=>{
        console.log(e);
        message.error("Click on No");

    }


    // 表格列配置项
    const columns = [
        {
            title: "Flight Number",
            dataIndex:"flightNum",
            key:"flightNum",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            fixed:"left",
            
        },
        {
            title: "Airline Name",
            dataIndex:"airlineName",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key:"airlineName"
        },
        {
            title: "Dept. Airport",
            dataIndex: "sourceAirportName",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key: "sourceAirportName"
        },
        {
            title: "Arri. Airport",
            dataIndex: "destAirportName",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key: "destAirportName"
        },
        {
            title: "Dept. Time",
            dataIndex: "departureTime",
            valueType:"dateTime",
            // textWrap:"word-break",
            width:150,
            ellipsis:true,
            key: "departureTime"
        },
        {
            title: "Arri. Time",
            dataIndex: "arrivalTime",
            valueType:"dateTime",
            key: "arrivalTime",
            width:150,
            // textWrap:"word-break",
       
            ellipsis:true,
        },
        {
            title: "Price",
            dataIndex: "price",
            hideInSearch:true,
            key: "price",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
        },
        {
            title: "Airplane ID",
            dataIndex: "airplaneId",
            hideInSearch:true,
            key: "airplaneId",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
        },
        {
            title: "Status",
            dataIndex: "status",
            hideInSearch:true,
            key: "status",
            render: tags => (
                <>
                    {
                        <Tag color={statusColor[tags]} key={tags}>
                            {tags.toUpperCase()}
                        </Tag>
                    }
                </>
            )
        },
        {
            title: "Action",
            key: 'action',
            hideInSearch:true,
            fixed:"right",
            render: (text, record) => (
                <Space size="middle">
                
                <Button onClick={()=>{
                  handleDetailModalVisible(true);
                  setStepFormValues(record);
                }}>Details</Button>
                 <Tooltip title={loginInfo.current?loginInfo.current.permissionDescription.includes("Operator")?undefined:"Insufficient Privileges!":undefined} color={"orange"}>
                <Button disabled={loginInfo.current?loginInfo.current.permissionDescription.includes("Operator")?false:true:false} onClick={()=>{
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                }} type={'primary'} size={'small'} >
                  <EditOutlined style={{fontSize: '15px'}} />
                </Button></Tooltip>
                <Popconfirm
                     title="Are you sure to delete this row?"
                    onConfirm={(e)=>{confirm(e,record);}}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                 <Tooltip title={loginInfo.current?loginInfo.current.permissionDescription.includes("Operator")?undefined:"Insufficient Privileges!":undefined} color={"orange"}>
                <Button disabled={loginInfo.current?loginInfo.current.permissionDescription.includes("Operator")?false:true:false} onClick={()=>{
                }} type={'primary'} size={'small'} danger >
                  <DeleteOutlined style={{fontSize: '15px'}} />
                </Button></Tooltip></Popconfirm>
              </Space>
        
            )
        }
    ]

    // 获取数据 
    const getData = async (params,sort,filter) => {
        // 组装查询参数，比如这里用 pageIndex 代替了 current
        if(defaultRef.current==true){
              console.log("调用getData");
            const query = {
                ...params,
                pageIndex: params.current
            };
            delete query.current;

            // 发起请求
            console.log("发起请求")
            const {data,success} = await fetchFlightData(query); //这里需要返回一个异步函数
            
            // 格式化返回数据
            return {
                data: data.records,
                success,
                total: data.total,
            };
        }else{
          console.log(defaultRef);
            console.log("调用getFilteredData");
            const query = {
                ...params,
                pageIndex: params.current
            };
            delete query.current;
    
            // 发起请求
            console.log("发起请求");
            console.log(params);
            const {data,success} = await fetchFilteredFlightData(query); //这里需要返回一个异步函数
            
            // 格式化返回数据
            return {
                data: data.records,
                success,
                total: data.total,
            };
        }
        
    };

    return (
        <div>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={getData}
            rowKey={(record,index)=>index}
            scroll={{"y":300,x:1300}}
            form={{span:8}}
            size={"middle"}
            rowSelection={{
                onchange:(_,selectedRows)=>setSelectedRows(selectedRows),
            }}
            toolBarRender={() => [
              <Tooltip title={loginInfo.current?loginInfo.current.permissionDescription.includes("Admin")?undefined:"Insufficient Privileges!":undefined} color={"orange"}>
            <Button key="3" type="primary" disabled={loginInfo.current?loginInfo.current.permissionDescription.includes("Admin")?false:true:false} onClick={()=>{
                handleCreateModalVisible(true);

            }}>
                <PlusOutlined />
                Add Flight
            </Button></Tooltip>,
        ]}
        />

        {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
               <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> items choosed &nbsp;&nbsp;
            </div>
          }
        >
          { radioValue === 'read' && (<Button
            danger
            type="primary"
            onClick={async () => {
              await handleDelete(selectedRows);
              setSelectedRows([]);
              // @ts-ignore
              actionRef.current?.reloadAndRest();
            }}
          >
            批量删除
          </Button>)}
          { radioValue === 'upload'&&(<Button
            type="primary"
            onClick={async () => {
              await handleUpdateMany(selectedRows);
              setSelectedRows([]);
            }}
          >
            批量新增
          </Button>)}
        </FooterToolbar>
      )}
        

      <CreateForm onSubmit={async (value) => {
            // 发送请求到后端
            const success = await handleUpdate(value);
            if (success) {
              //请求成功推出Modal页面
              handleUpdateModalVisible(false);
              //重置表单数据
              setStepFormValues({});
              //重新刷新子页面
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => handleCreateModalVisible(false)} 
          modalVisible={createModalVisible}
          handleCreateModalVisible={handleCreateModalVisible}
          handleCreate={handleCreate}
          className={"createForm"}>
        {/* <ProTable
          onSubmit={async (value) => {
            const success = await handleCreate(value);
            if (success) {
              handleCreateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey={["flight_id","airline"]}
          type="form"
          columns={columns}
          rowSelection={{}}
        /> */}
      </CreateForm>
         
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
        className="updateForm"
          onSubmit={async (value) => {
            // 发送请求到后端
            const success = await handleUpdate(value);
            if (success) {
              //请求成功推出Modal页面
              handleUpdateModalVisible(false);
              //重置表单数据
              setStepFormValues({});
              //重新刷新子页面
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          //取消update操作
          onCancel={() => {
              // 推出Modal
            handleUpdateModalVisible(false);
            //重置表单内容
            setStepFormValues({});
          }}
          handleUpdateModalVisible={handleUpdateModalVisible}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
          handleUpdate={handleUpdate}
        />
      ) : null}

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <DetailsTable className={"DetailForm"}
          handleDetailModalVisible={handleDetailModalVisible}
          detailModalVisible={detailModalVisible}
          onCancel={() => {
              // 推出Modal
            handleDetailModalVisible(false);
            //重置表单内容
            setStepFormValues({});
          }}
          values={stepFormValues}
        ></DetailsTable>):null}
      
    </div>
        



    );
};
