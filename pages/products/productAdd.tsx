import { APIService } from '@/common/service/api.service';
import { setMessage } from '@/common/utils/message.service';
import Dashboard from '@/components/dashboard';
import { Button, Col, Form, Input, message, Row } from 'antd';
 

export default function ProductAdd() {
  const { TextArea } = Input;
  const onFinish = (values: any) => {
    try {
      APIService.getInstance().httpPostAxios<any>("Product/AddProductAsync", values).then((res) => {
        if (res.IsSuccessful) {
          form.resetFields();
        }
        setMessage(res.Messages);

      })
        .catch(ex => {
          message.success("Beklenmedik bir hata oluştu.");
        });

    } catch (ex) {

    }
  };
  const [form] = Form.useForm();
  return (
    <Dashboard selectedKeys={["/products/productAdd"]}>
      <Row justify="center" >
        <Col style={{width : 540}} >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"  
              size={"large"} 
              onFinish={onFinish}
              form={form} 
            >
              <Form.Item label="Ürün Adı" name='ProductName'>
                <Input  /> 
              </Form.Item>
              <Form.Item label="Ürün Açıklaması" name="ProductComment">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Ekle
                  </Button>
                </Form.Item>
            </Form>          
        </Col>
        
         </Row> 
    </Dashboard>
  )
}
