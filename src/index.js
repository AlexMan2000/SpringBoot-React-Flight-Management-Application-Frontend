import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from "./homepage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css"
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import {Routes} from "react-router-dom";
import UserPage from "./page/UserPage";

//Configure the Routers for Conditional Rendering
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registercustomer" element={<RegisterPage initializeType='customer' />} />
                <Route path="/registerstaff" element={<RegisterPage initializeType='airlineStaff'/>}/>
                <Route path="/registeragent" element={<RegisterPage initializeType='bookingAgent'/>}/>
                <Route path="/customer" element={<UserPage initializingTab='customer' loginInfo={""}/>} />
                <Route path="/agent" element={<UserPage initializingTab='agent'/> } loginInfo={""} />
                <Route path="/staff" element={<UserPage initializingTab='staff'/> } loginInfo={""}/>
                <Route path="/global" element={<UserPage initializingTab='global'/> } loginInfo={""}/>
            </Routes>
        </Router>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
