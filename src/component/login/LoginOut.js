import {Menu,Tooltip,Modal} from "antd";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import cookie from 'react-cookies'

export default function countDown(loginInfo) {
    let secondsToGo = 5;
    let name = loginInfo.current.alias;
    const modal = Modal.success({
      title: `See you, ${name}`,
      content: `Close in ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Close in ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }


  export function countDownAnony() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: `See you next time !`,
      content: `Close in ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Close in ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }