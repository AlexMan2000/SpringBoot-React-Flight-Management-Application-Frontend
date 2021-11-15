import React,{useState} from "react"
import RegisterCard from "../component/login/RegisterCard"

export default function RegisterPage({initializeType}){

    

    return (
        <div style={{width: '100vw', position: 'absolute',top:'10vw'}}>
            <RegisterCard initializeType={initializeType}/>
        </div>
    )
}