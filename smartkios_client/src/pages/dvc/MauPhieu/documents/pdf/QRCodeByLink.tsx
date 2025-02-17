import { HOST_PATH, DATE, MONTH, YEAR, CURRENTTIME } from '@/data';
import axiosInstance from '@/lib/axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const QRCodeByLink = async (key: string, content: string) => {
    const guid = uuidv4();
    let currentTime = moment();
    let nextMonthTime = currentTime.add(1, 'months');
    let nextMonthRequest = nextMonthTime.toISOString();
    
    const requestBodyMemoryCache = {
        key: `${key}`,
        value: guid,
        cacheTime: 1
    };
    const requestBodyCreatQr = {
        id: guid,
        content: content,
        expiry: nextMonthRequest
    };

    let responseMemoryCache: string = ''

    try {
        const response = await axiosInstance.post(`${HOST_PATH}/api/v1/hosos/getorsetmemorycache`, requestBodyMemoryCache, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        responseMemoryCache = response.data


    } catch (error) {
        console.error('Error:', error);
    }


    if (responseMemoryCache == 'setMeroryCache') {
        try {
            const response = await axiosInstance.post(`${HOST_PATH}/api/v1/hosos/saveqrcodedata/${guid}`, requestBodyCreatQr, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log(`${HOST_PATH}/apiqr/qr?id=${responseMemoryCache}`)
        return `${HOST_PATH}/apiqr/qr?id=${responseMemoryCache}`
    }
    console.log(`${HOST_PATH}/apiqr/qr?id=${guid}`)

    return `${HOST_PATH}/apiqr/qr?id=${guid}`

}