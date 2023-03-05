
import { APIService } from '@/common/service/api.service';
import '@/styles/globals.css';
import { Spin } from 'antd';
import type { AppProps } from 'next/app';
import { memo, useEffect, useState } from 'react';

export default memo(App);
 function App({ Component, pageProps }: AppProps) { 
  
  const [apiCallCount, setApiCallCount] = useState(APIService.getApiCallCount()); 
  useEffect(() => {
    setInterval(() =>  controlTimeOut(), 1000);
  }, []);


function controlTimeOut() {
   if(APIService. getApiCallCount() !=apiCallCount){ 
    setTimeout(()=>{
      setApiCallCount(APIService. getApiCallCount())
     }, 1000)
   }  
}


  const getStyle=()=>{
    return apiCallCount > 0 ? {zIndex:10000000000} : {zIndex:0}
  }
  return ( 
      <Spin tip="Loading..." spinning={apiCallCount > 0} style={getStyle()}>
        <Component {...pageProps} />
      </Spin>  
  )
}


