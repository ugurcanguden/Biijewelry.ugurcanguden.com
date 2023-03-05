import { PagerResult } from '@/common/models/common/pagerResult.model';
import { ProductPagerResult } from '@/common/models/productPagerResult.model';
import { APIService } from '@/common/service/api.service';
import ProductCard from '@/components/productCard';
import CommonLayout from '@/components/public/commonLayout';
import { Col, Pagination, PaginationProps, Row } from 'antd';

import { useEffect, useState } from 'react';



export default function Index() {
  const commonModel = {
    PageIndex : 0,
    PageSize  : 2,
    SortColumb  : "ProductName" ,
  }

  const request =  { 
    ...commonModel,
    Data   : [],
    PageIndex : 0 ,
    PageSize : 2,
    SortColumb : "ProductName",
    TotalPage : 1 ,
    TotalRowCount : 1 
  };

  const pagerRequest =  {  
    ...commonModel,
    IsSortColumbDesc : true
  };

  const [pagerResult, setPagerResult] = useState<PagerResult<ProductPagerResult>>(request);

  const onChange: PaginationProps['onChange'] = (page) => {getProduct(page);}; 
  useEffect(() => {getProduct();}, [])

  const getProduct = async (page ? : number) => {
     let request = pagerRequest;
     if(page != undefined){
      request = {...request,PageIndex : page}
     }
      await APIService
      .getInstance()
      .httpPostAxios<PagerResult<ProductPagerResult>>(`Product/GetProductPagerResult`,request)
        .then(response =>
           { 
            console.log(response)
            setPagerResult(response);
        })
        .catch(ex => {
        })
    } 
  return (
    <CommonLayout selectedKey='/'>
      <>
        <Row justify="center" >       
            {pagerResult?.Data?.map((product: ProductPagerResult, index: number) =><ProductCard key={index} {...product}></ProductCard>)}      
        </Row>  
        <Row justify="center" >
          <Col >
            <Pagination 
              current={pagerResult?.PageIndex} 
              onChange={onChange}  
              total={pagerResult?.TotalRowCount} 
              pageSize = {pagerResult?.PageSize}
            />
          </Col>
        </Row>        
      </>
    </CommonLayout>
  )



}

