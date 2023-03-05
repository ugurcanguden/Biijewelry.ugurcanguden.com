import { User } from '@/common/models/user.model'
import { getLocalStoreByName } from '@/common/utils/store.service'
import Dashboard from '@/components/dashboard'
import Logout from '@/components/logout'
import { Col, Descriptions, Divider, Row } from 'antd'
import { useEffect, useState } from 'react'

export default function UserInformation() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
      if (getLocalStoreByName<User>("user"))
        setUser(getLocalStoreByName<User>("user"))
    }, [])


    const UserDescription = (user: User) => {
        return (
          <>
            <Row>
              <Col span={12} offset={6}>
                <Descriptions title="Kullanıcı Bilgileri " layout="vertical" bordered>
                  <Descriptions.Item label="İsim" span={3}>{user.FirstName}</Descriptions.Item>
                  <Descriptions.Item label="Soyisim" span={3}>{user.LastName}</Descriptions.Item>
                  <Descriptions.Item label="UserName" span={3}>{user.UserName}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row justify="end">
              <Col span={12} offset={12}>
                <Logout />
              </Col>
            </Row>
          </>
        )
      }

      
  return (
    <Dashboard selectedKeys={["/auth/userInformation"]}>   
      {user && UserDescription(user) }
    </Dashboard>
  )
}
