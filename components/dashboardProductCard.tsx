import { Products } from '@/common/models/product.model';
import { APIServiceConfig } from '@/common/service/api.service';
import ProductImageEdit from '@/components/dashboardProductImageEdit';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Collapse, Modal, Row } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DashboardProductCard = (product: Products) => {

    const [productImagaUrl, setProductImagaUrl] = useState(APIServiceConfig.baseUrl + product.ProductImagaUrl);
    useEffect(() => {

    }, [product.Id])
    const [open, setOpen] = useState(false); 


    const handleUpdateImageUrl = (imageUrl: string) => {
        setProductImagaUrl(imageUrl);
    }

    const productImageProps: any = {
        product: product,
        handleUpdateImageUrl: handleUpdateImageUrl
    }

    const { Panel } = Collapse;

    return (
        <Row >
            <Modal
                title="Resim Ekle"
                open={open}
                onCancel={() => setOpen(!open)}
                onOk={() => setOpen(!open)}
                okButtonProps={{ ghost: true }}
                cancelButtonProps={{ ghost: true }}
            >
                <ProductImageEdit  {...productImageProps} />
            </Modal>
            <Card
                hoverable 
                cover={
                <img alt="example" src={productImagaUrl} style={{ width: 490,height:"100%" }} key={product.Id}/>
            }
                actions={[
                    <Link key={1} href={`products/productEdit?id=${product.Id}`}><SettingOutlined />Düzenle </Link>,
                    <Button key={2}  type="primary" onClick={() => setOpen(!open)}>
                        <CameraOutlined />Resim Ekle
                    </Button> 
                ]}
            > 
                <Card title={product.ProductName} bordered={false}>
                    <div>
                        <Collapse ghost>
                            <Panel header={product.ProductComment?.length < 60 ? product.ProductComment : (product.ProductComment.substring(0, 60) + "...")} key="1">
                                <p>{product.ProductComment}</p>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </Card>

        </Row>
    );

}

export default DashboardProductCard; 