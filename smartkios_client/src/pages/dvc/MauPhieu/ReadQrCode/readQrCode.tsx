import { HOST_PATH } from '@/data';
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

    useEffect(() => {
        if (idRequest)
            fetchData();
    }, [idRequest]);

    const fetchData = async () => {
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
    };

    return (
        <div className="wrapper" style={{ height: '100vh', backgroundColor: '#eeeeee' }}>
            <div style={{padding: 20}} >
                {data ?
                    <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                    :
                    <b>Mã QR không hợp lệ hoặc đã hết hạn!</b>
                }

            </div>
        </div>

    )
}

export default ReadQrCode