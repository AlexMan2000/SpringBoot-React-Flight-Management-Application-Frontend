import {Button, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom"
import RcQueueAnim from "rc-queue-anim";

const {Title} = Typography;

export default function HomePage() {
    // Add Link to "/login"
    return (
        <div style={{textAlign: 'center', width: '100%', position: 'absolute', top: '40vh'}}>
            <RcQueueAnim type="left" >
                <Title key="ele1" style={{}}>Welcome to Our Airline System</Title>
                <Button key="ele2" type="primary" shape="circle" size="large">
                    <Link to="/login">
                        <ArrowRightOutlined />
                    </Link>
                </Button>
            </RcQueueAnim>
        </div>
    )
}

