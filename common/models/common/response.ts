export default interface ApiResponse<T>{
    Data : T;
    StatusCode : number;
    IsSuccessful : boolean;
    Messages : ResponseMessage[];
}
export interface IResponseMessage{
             Message:string;
             MessageType:MessageType ;
             MessageCode : string;
}
export class ResponseMessage implements IResponseMessage{
    Message: string ="";
    MessageType: MessageType = MessageType.Success;
    MessageCode: string="";

}
export enum MessageType
{
    Success = 1,
    Error = 2,
    Info = 3
}
export interface NoContent{

}