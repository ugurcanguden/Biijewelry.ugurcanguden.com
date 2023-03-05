import { message } from "antd";
import {  MessageType, ResponseMessage } from "../models/common/response"

export const setMessage =(msg : ResponseMessage)=>{
   
    switch (msg.MessageType) {
        case MessageType.Success:
            message.success(msg.Message);
            break;
        case MessageType.Info:
            message.info(msg.Message);
            break;
        case MessageType.Error:
            message.error(msg.Message);
            break;
        default:
            break;
    }; 
}