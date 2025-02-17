import { HOST_PATH, DATE, MONTH, YEAR, CURRENTTIME } from '@/data';
import axiosInstance from '@/lib/axios';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export const QRCodeByLink = async (key: string, content: string) => {
    const guid = uuidv4();
    let currentTime = dayjs();
    let nextMonthTime = currentTime.add(1, 'months');
    let nextMonthRequest = nextMonthTime.toISOString();
    const requestBodyCreatQr = {
        id: guid,
        content: content,
        expiry: nextMonthRequest
    };
    try {
        const response = await axiosInstance.post(`${HOST_PATH}/api/v1/hosos/saveqrcodedata/${guid}`, requestBodyCreatQr, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)

    } catch (error) {
        console.error('Error:', error);
    }

    console.log(`${window.location.host}/apiqr/qr?id=${guid}`)

    return `${window.location.host}/apiqr/qr?id=${guid}`

}