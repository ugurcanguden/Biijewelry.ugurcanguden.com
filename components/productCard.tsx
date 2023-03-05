import { Products } from '@/common/models/product.model';
import { Button, Card, Collapse, Modal } from 'antd'
import React, { useState } from 'react'
import { Image } from 'antd';
import { ProductPagerResult } from '@/common/models/productPagerResult.model';
import { ProductImages } from '@/common/models/productImage.model';
import { APIServiceConfig } from '@/common/service/api.service';
import { ZoomInOutlined } from '@ant-design/icons';


export default function ProductCard(productPagerResult: ProductPagerResult) {

  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse;
  const [modal, contextHolder] = Modal.useModal();

  const  onClickDetail =(productName: string,detail : string)=>{  
    Modal.info({
      title: `${productName}`,
      content: (
        <div>
          <p>{detail}</p>
        </div>
      ),
      onOk() {},
    });
  };


  return (
    <>
      <Card 
        title={productPagerResult.Products.ProductName}
        bordered={true}
        style={{ width: 300 , margin : "2%"}}
        extra={<Button onClick={() => onClickDetail(productPagerResult.Products.ProductName,productPagerResult.Products.ProductComment)}><ZoomInOutlined/>Detay</Button>}
      >
        <Image
          preview={{ visible: false }}
          width={200}
          src={APIServiceConfig.baseUrl + productPagerResult.Products.ProductImagaUrl}
          onClick={() => setVisible(true)}
        />
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
            {productPagerResult.ProductImages?.map((product: ProductImages, index: number) => <Image key={index} src={APIServiceConfig.baseUrl + product.ImagaUrl} />)}
          </Image.PreviewGroup>
        </div> 
      </Card> 
    </>
  )

}
