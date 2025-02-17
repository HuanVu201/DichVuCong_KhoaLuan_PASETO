import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal, AntdSelect, AntdUploadPublicFile } from "@/lib/antd/components"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_VERSION, CURRENTTIME, UPLOADFILE_ENDPOINT } from "@/data";
import { Signotec, SignotecRef } from "@/lib/signotec/Signotec";
import axiosInstance from "@/lib/axios";
import { IResult } from "@/models";
import { useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext";

const KyDienTuModal = () => {
    const xuLyHoSoContext = useXuLyHoSoContext()
    let signotecRef = useRef<SignotecRef | null>(null)
    const [usingSignotec, setUsingSignotec] = useState<boolean>(false)
    const { publicModule: config } = useAppSelector(state => state.config)

    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'using-signotec' && item.content == '1') {
                setUsingSignotec(true)
            }
        })
    }, [config])

    const base64ToBlob = (base64: string) => {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([byteArray], { type: mimeString });
    };


    const onOk = async () => {

        let base64: string = ''

        if (!usingSignotec) return

        if (usingSignotec)
            base64 = await signotecRef.current?.confirmSignture();



        if (!base64) {
            toast.error('Thực hiện Ký điện tử công dân!')
            return
        } else {
            const blobImage: Blob = base64ToBlob(base64)
            const bodyFormData = new FormData();
            bodyFormData.append('Files', blobImage!, `Signotec.png`);
            bodyFormData.append('FolderName', `SignotecTraKetQua`);
            const resCreat = await axiosInstance.post<IResult<any>>(API_VERSION + UPLOADFILE_ENDPOINT, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (resCreat) {
                xuLyHoSoContext.setKyDienTuModalVisible(false)
                xuLyHoSoContext.setUrlChuKyDienTu(resCreat.data.data)
                xuLyHoSoContext.setBase64ChuKyDienTu(base64)
                xuLyHoSoContext.setUrlChuKyCongDan(resCreat.data.data)
                xuLyHoSoContext.handlerXuatLaiPhieu()
                toast.success('Ký điện tử thành công!')
            } else {
                xuLyHoSoContext.setKyDienTuModalVisible(false)
                toast.error('Có lỗi trong quá trình ký điện tử!')
            }
        }

    }


    const handlerCancel = () => {
        xuLyHoSoContext.setKyDienTuModalVisible(false)
    }

    return <AntdModal visible={true} title={`KÝ ĐIỆN TỬ`} width={700} handlerCancel={handlerCancel}
        footer={[
            <Button type="primary" onClick={onOk} >
                Xác nhận
            </Button>,
            <Button key="back" onClick={handlerCancel}>
                Hủy
            </Button>
        ]}
    >
        {usingSignotec ? <Signotec ref={signotecRef} /> : null}
    </AntdModal>
}



export default KyDienTuModal