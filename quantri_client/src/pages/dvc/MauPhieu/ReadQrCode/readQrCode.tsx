import { HOST_PATH } from '@/data';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

interface IQrService {
    id: string,
    content: string,
    createdAt: string,

}

const ReadQrCode = () => {
    const [data, setData] = useState<IQrService>()
    const [content, setContent] = useState('')
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idRequest = searchParams.get('id');
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (idRequest)
            fetchData();
    }, [idRequest]);

    const fetchData = async () => {
        setTimeout(async () => {
            try {
                const response = await fetch(`${HOST_PATH}/api/v1/hosos/getqrcodedata/${idRequest}`);
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false)
        }, 2000)
    };

    return (
        <div className="wrapper" style={{ height: '100vh', backgroundColor: '#eeeeee' }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />} >
                <div style={{ padding: 20 }} >
                    {data ?
                        <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                        :
                        <b>Mã QR không hợp lệ hoặc đã hết hạn!</b>
                    }

                </div>
            </Spin>
        </div>

    )
}

export default ReadQrCode