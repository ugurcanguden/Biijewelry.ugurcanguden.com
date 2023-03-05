import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { getLocalStoreByName, removeLocalStorage } from "../utils/store.service";
export const APIServiceConfig = {
  baseUrl: "https://ugurcanguden.azurewebsites.net/",
  api: "https://ugurcanguden.azurewebsites.net/api/",
  options: {
    headers: { 'content-type': 'application/json' },
  },
};
import router from 'next/router';
import { message } from "antd";
export class APIService {
  private static instance: APIService;
  private static apiCallCount: number = 0;

 
 

  httpPostAxios<T>(endpoint: string, data: any,showSpinner : boolean = true) {
    if(showSpinner){
      APIService.setApiCallCount(1);    
    }

    return axios.post<T>(`${APIServiceConfig.api}${endpoint}`, data,this.getOptions() ).then(res => res.data).finally(()=>{
      if(showSpinner) APIService.setApiCallCount(-1)
    });
  }

  httpGetAxios(endpoint: string,showSpinner : boolean = true) {
    if(showSpinner){
      APIService.setApiCallCount(1);   
    }
    let options = this.getOptions();
    return axios.get(`${APIServiceConfig.api}${endpoint}`, options).then(res => res.data).finally(()=>{
      if(showSpinner) APIService.setApiCallCount(-1)
    });
  }

  httpPutAxios(endpoint: string, data: any,showSpinner : boolean = true) {
    if(showSpinner)
      APIService.setApiCallCount(1);
    return axios.put(`${APIServiceConfig.api}${endpoint}`, data,this.getOptions()).then(res => res.data).finally(()=>{
      if(showSpinner) APIService.setApiCallCount(-1)
    });
  }

  httpDeleteAxios(endpoint: string,showSpinner : boolean = true) {
    if(showSpinner)
      APIService.setApiCallCount(1); 

    return axios.delete(`${APIServiceConfig.api}${endpoint}`,this.getOptions()).then(res => res.data).finally(()=>{
      if(showSpinner) APIService.setApiCallCount(-1)
    });
  }

  httpPostMultiPartAxios(endpoint: string, data: any,showSpinner : boolean = true) {
    if(showSpinner){
      APIService.setApiCallCount(1);    
    } 
    return axios.post(`${APIServiceConfig.api}${endpoint}`, data,this.getOptions("") ).then(res => res.data).finally(()=>{
      if(showSpinner) APIService.setApiCallCount(-1)
    });
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new APIService();
    }
    return this.instance;
  }

  public static getApiCallCount():number{
    return this.apiCallCount;
  }
  public static setApiCallCount(value : number){ 
    this.apiCallCount = this.apiCallCount+value;
  }

  getOptions(contentType : string ="application/json" ){
    const token = getLocalStoreByName<string>("token");
    const headers : AxiosHeaders = new AxiosHeaders();
    headers.setAuthorization(`Bearer ${token}`);
    if(contentType?.length > 0)
      headers.setContentType("application/json"); 
    const config: AxiosRequestConfig = {
       headers : headers
    }; 
 
     return config;
  } 
}
  //#region  Interceptor...  
  // For GET requests
  axios.interceptors.request.use(
    (req) => {
      // Add configurations here
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // For POST requests
  axios.interceptors.response.use(
    (res) => { 
      return res;
    },
    (err) => {
      if(err.response.status == "401"){
        message.info("Oturumunuzun süresi dolmuştur lütfen tekrar giriş yapınız.")
        removeLocalStorage("user");
        removeLocalStorage("token");  
        router.push('/auth/login', undefined, { shallow: true });  
      } 
      return Promise.reject(err);
    }
  );
  //#endregion

