import { Products } from '@/common/models/product.model';
import { APIService } from '@/common/service/api.service';
import { setMessage } from '@/common/utils/message.service';
import Dashboard from '@/components/dashboard';
import { LeftCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Switch } from 'antd';
 
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

export default function ProductEdit() {

  const [product, setProduct] = useState<Products>();
  const [active, setActive] = useState<boolean>();
 

  const router = useRouter();
  useEffect(() => {
    APIService.getInstance().httpGetAxios("Product/GetProductByIdAsync?productId=" + router.query.id).then((res) => {
      if (res.IsSuccessful) {
        form.setFieldsValue({
          ["ProductName"]: res.Data.ProductName
        });
        form.setFieldsValue({
          ["ProductComment"]: res.Data.ProductComment
        });
        let status = res.Data.Status == 1
        setActive(status);
        setProduct(res.Data);
      }
    })
      .catch(ex => {
        message.success("Beklenmedik bir hata oluştu.");
      });
  }, [])
  const { TextArea } = Input;
  const onFinish = (values: any) => {
    product!.ProductComment = values.ProductComment;
    product!.ProductName = values.ProductName;
    product!.Status = active ? 1 : 0;

    APIService.getInstance().httpPutAxios("Product/UpdateProductAsync", product).then((res) => {
      setMessage(res.Messages);

    })
      .catch(ex => {
        message.success("Beklenmedik bir hata oluştu.");
      });
  };
  const [form] = Form.useForm();
  return (
    <Dashboard selectedKeys={["/products"]}>
      <Row justify="center" >
        <Col style={{width : 540}} >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size={"large"}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item label="Ürün Adı" name='ProductName'>
              <Input />
            </Form.Item>
            <Form.Item label="Ürün Açıklaması" name="ProductComment">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Aktif" >
              <Switch checked={active} onChange={(e) => { setActive(e) }} />
            </Form.Item>
            <Row >
              <Col md={12}>
                <Button type="primary" icon={<LeftCircleOutlined />} onClick={() => { router.push("/products") }}>
                  Geri
                </Button>              
              </Col>
              <Col md={12}> 
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Güncelle
                  </Button> 
              </Col> 
            </Row>
          </Form>
        </Col>
      </Row>
    </Dashboard>
  )
}
