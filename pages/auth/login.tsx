import { User } from '@/common/models/user.model';
import { APIService } from '@/common/service/api.service';
import { setMessage } from '@/common/utils/message.service';
import { setLocalStorage } from '@/common/utils/store.service';
import CommonLayout from '@/components/public/commonLayout';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
export default function Login() {
  const router = useRouter()
  const onFinish = (values: any) => {
    try {
      APIService.getInstance().httpPostAxios<any>("Users/authenticate", values).then((res) => {
        if (res.Result.IsSuccessful) {
          let user = res.Result.Data as User;
          setLocalStorage(user.Token, "token");
          setLocalStorage(user, "user");
          router.push('/products', undefined, { shallow: true })
        }
        setMessage(res.Result.Messages);

      })
        .catch(ex => {
          message.success("Beklenmedik bir hata oluştu.");
        });

    } catch (ex) {

    }
  };


  return (
    <CommonLayout selectedKey='/auth/login'>      
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="UserName"
            rules={[{ required: true, message: 'Kullanıcı adı zorunludur' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="Password"
            rules={[{ required: true, message: 'Şifre  zorunludur' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Giriş
            </Button>
          </Form.Item>
        </Form> 
      </CommonLayout>

  );


}