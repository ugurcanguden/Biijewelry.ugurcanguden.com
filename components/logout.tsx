import { removeLocalStorage } from '@/common/utils/store.service'
import { PoweroffOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

export default function Logout() {
    const router = useRouter()
  return (
        <Button type="primary"   
        icon={<PoweroffOutlined />}
        onClick={() => 
        {
            removeLocalStorage("user");
            removeLocalStorage("token"); 
            router.push('/auth/login', undefined, { shallow: true })
        }
        }>Çıkış</Button>
  )
}
