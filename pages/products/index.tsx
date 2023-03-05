import { Products } from '@/common/models/product.model';
import { APIService } from '@/common/service/api.service';
import { setMessage } from '@/common/utils/message.service';

import Dashboard from '@/components/dashboard';
import DashboardProductCard from '@/components/dashboardProductCard';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, message, Popconfirm, Row } from 'antd';

import { useEffect, useState } from 'react';
export default function Index() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    await APIService.getInstance().httpGetAxios(`Product/GetProductsAsync`)
      .then(response => {
        setProducts(response.Data);
      })
      .catch(ex => {
      })
  };
  const confirm = () => {
    APIService.getInstance().httpDeleteAxios("Product/DeleteProductAsync?productId=" + SelectedProductId)
      .then(async (res) => {
        setMessage(res.Messages);
        getProduct();
      })
      .catch(ex => {
        message.success("Beklenmedik bir hata oluştu.");
      })
      .finally(() => setShowConfirm(false));
  }
  const [showConfirm, setShowConfirm] = useState(false);
  const [SelectedProductId, setSelectedProductId] = useState("");
  return (
    <Dashboard selectedKeys={["/products"]}>
      <div style={{ textAlign: "center" }}>
        <Popconfirm
          title="Emin Misiniz?"
          description="Silmek istediğinize emin misiniz?"
          onConfirm={confirm}
          onCancel={() => setShowConfirm(false)}
          okText="Yes"
          cancelText="No"
          open={showConfirm}
        />
      </div>
      <Row >
        {
          products?.map((product: any, index: number) =>
            <Card title={product.ProductName} key={index} 
              extra={
                <Button 
                key={index} 
                onClick={() => { setSelectedProductId(product.Id); setShowConfirm(true); }}> 
                <DeleteOutlined key={index} />Sil
                </Button>
              } style={{ width: 540, margin: "2%" }} >
              <DashboardProductCard key={index} {...product} />
            </Card>

          )
        }
      </Row>
    </Dashboard>
  )

}