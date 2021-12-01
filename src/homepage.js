import {Button, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom"
import RcQueueAnim from "rc-queue-anim";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import cookie from 'react-cookies';

axios.defaults.withCredentials = true;


const {Title} = Typography;




export default function HomePage() {

    let navigate = useNavigate();


    const handleClickDefault =()=>{
        console.log("haha");
        const shit = cookie.load("JSESSIONID");
        console.log(shit);
    }

    // const handleClick = ()=>{

    //     axios({
    //         url:"http://localhost:8080/login/token",
    //         method:"POST",
    //     }).then(function(response){
    //         if(response.data){
    //             console.log(response.data);
    //             const statusMessage = response.data;
    //             let info = null;
    //             if(response.data.status==true){
    //                 const userType = response.data.userType;
    //                 if(userType==="staff"){
    //                      info = response.data.airlineStaff;
                        
    //                 }else if(userType==="customer"){
    //                      info = response.data.customer;
    //                 }else if(userType==="agent"){
    //                      info = response.data.bookingAgent;
    //                 }
    //                 navigate("/"+userType,{replace:true});
    //             }
    //             console.log(info);
    //         }
    //     })

        
    // }

    return (
        <div style={{textAlign: 'center', width: '100%', position: 'absolute', top: '40vh'}}>
            <RcQueueAnim type="left" >
                <Title key="ele1" style={{}}>A Light Weight Airline System</Title>
                <Button key="ele2" type="primary" shape="circle" size="large"> 
                    <Link to="/global" > 
                        <ArrowRightOutlined />
                     </Link> 
                </Button>
            </RcQueueAnim>
        </div>
    )
}

