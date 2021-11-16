import React,{useEffect,useState,useRef} from "react";
import moment from "moment";
import axios from "axios";
import {dateFormat} from "../../lib/dateFormat";
import "antd/dist/antd.css";
import {v4 as uuidv4} from "uuid";
import ProTable from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {PlusOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Button, Space, Tag,Popconfirm, message} from "antd";
import { statusColor } from "../../lib/statusTag";
import CreateForm from "./CRUDElements/CreateForm";
import UpdateForm from "./CRUDElements/UpdateForm";

export default function FlightCRUD(){

    //控制添加Modal的可视
    const [createModalVisible,handleCreateModalVisible] = useState(false);
    //控制更新Modal的可视，由于需要数据回显，故和createModal分开写
    const [updateModalVisible,handleUpdateModalVisible] = useState(false);
    const [selectedRows,setSelectedRows] = useState([]);
    //设置回显的数据
    const [stepFormValues, setStepFormValues] = useState({});
    //用于判断是否能够多选
    const [radioValue, setRadioValue] = useState('read');
    //从后台api获取的数据
    const [apiData, setApiData] = useState([]);
    //全局变量，在整个生命周期都有效
    const actionRef = useRef();
    

    //异步方法提交数据
    const fetchFlightData = (query)=>{

        return {"data":dataSource,"success":true};
    }

    const dataSource = {"records":[
        {
          flight_id: "MU12243234",
          airline_name:"Cathay Pacific",
          dept:"PVG",
          dept_time:"2020-01-01",
          arri:"SZX",
          arri_time:"2020-01-02",
          price:3030,
          status:["upcoming"],
          airplane_id:"MU888"
        },
        {
          flight_id: "MU12324325",
          airline_name:"Cathay Pacific",
          dept:"PVG",
          dept_time:"2024-01-01",
          arri:"SZX",
          arri_time:"2024-01-01",
          price:3030,
          status:["upcoming"],
          airplane_id:"MU888"
        },
        {
            flight_id: "MU1234346",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU1222236",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU123226",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU12336",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU12546",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU0236",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU1436",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU1266",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU1239",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
        {
            flight_id: "MU1235",
            airline_name:"Cathay Pacific",
            dept:"PVG",
            dept_time:"2077-01-03",
            arri:"SZX",
            arri_time:"2077-01-04",
            price:3030,
            status:["upcoming"],
            airplane_id:"MU888"
        },
      ],"total":12,"success":true};


    const handleDelete= (flight_id,airline_name)=>{
        console.log("delete");
    }

    const handleUpdate = (flight_info)=>{
        console.log("update");
    }

    const handleUpdateMany =()=>{

    }

    const handleCreate = ()=>{
        console.log("Create");
    }

    const handleDetails =()=>{
        console.log("show info");
    }

    const confirm = (e)=>{
        console.log(e);
        message.success("Click on Yes");
    }

    const cancel = (e)=>{
        console.log(e);
        message.error("Click on No");

    }


    // 表格列配置项
    const columns = [
        {
            title: "Flight Number",
            dataIndex:"flight_id",
            key:"flight",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
        },
        {
            title: "Airline Name",
            dataIndex:"airline_name",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key:"airline"
        },
        {
            title: "Dept. Airport",
            dataIndex: "dept",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key: "dept"
        },
        {
            title: "Arri. Airport",
            dataIndex: "arri",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key: "arri"
        },
        {
            title: "Dept. Time",
            dataIndex: "dept_time",
            valueType:"date",
            textWrap:"word-break",
            width:100,
            ellipsis:true,
            key: "dept_time"
        },
        {
            title: "Arri. Time",
            dataIndex: "arri_time",
            valueType:"date",
            key: "arri_time",
            textWrap:"word-break",
            width:100,
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
            dataIndex: "airplane_id",
            hideInSearch:true,
            key: "airplane_id",
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
                    {tags.map(status => (
                        <Tag color={statusColor[status]} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    ))
                    }
                </>
            )
        },
        {
            title: "Action",
            key: 'action',
            hideInSearch:true,
            render: (text, record) => (
                <Space size="middle">
                <Button onClick={()=>{}}>Details</Button>
                <Button onClick={()=>{
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                    console.log("edit");

                }} type={'primary'} size={'small'} >
                  <EditOutlined style={{fontSize: '15px'}} />
                </Button>
                <Popconfirm
                     title="Are you sure to delete this row?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                <Button onClick={()=>{
                    console.log("删除");

                }} type={'primary'} size={'small'} danger >
                  <DeleteOutlined style={{fontSize: '15px'}} />
                </Button></Popconfirm>
              </Space>
        
            )
        }
    ]

    // 获取数据 
    const getData = async (params) => {
        // 组装查询参数，比如这里用 pageIndex 代替了 current
        const query = {
            ...params,
            pageIndex: params.current
        };
        delete query.current;

        // 发起请求
        const { data, success } = fetchFlightData(query);
        console.log(data);
        console.log(success);
        // 格式化返回数据
        return {
            data: data.records,
            success,
            total: data.total,
        };
    };

    return (
        <div>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={getData}
            rowKey={(record,index)=>index}
            scroll={{"y":300,"x":"100%"}}
            form={{span:8}}
            size={"middle"}
            rowSelection={{
                onchange:(_,selectedRows)=>setSelectedRows(selectedRows),
            }}
            toolBarRender={() => [
            <Button key="3" type="primary" onClick={()=>{
                handleCreateModalVisible(true);

            }}>
                <PlusOutlined />
                Add Flight
            </Button>,
        ]}
        />

        {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项&nbsp;&nbsp;
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
          handleCreate={handleCreate}>
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


        </div>
        



    );
};
