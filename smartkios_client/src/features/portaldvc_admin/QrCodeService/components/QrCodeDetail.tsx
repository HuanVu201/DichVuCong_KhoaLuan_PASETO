import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IQrCodeService } from "../Models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { useQrCodeServiceContext } from "../context/QrCodeService"
import TextArea from "antd/es/input/TextArea"
import { v4 as uuidv4 } from 'uuid';
import { HOST_PATH } from "@/data"
import QrCode from "qrcode"

export const QrCodeServiceDetail = () => {
    const dispatch = useAppDispatch()
    const guid = uuidv4();
    const [srcQrCodeThongTin, setSrcQrCodeThongTin] = useState<any>('')

    const QrCodeServiceContext = useQrCodeServiceContext()
    // console.log(QrCodeServiceContext.urlQrView)
    const [form] = Form.useForm<IQrCodeService>()


    const handleCancel = () => {
        form.resetFields();
        QrCodeServiceContext.setViewQrCodeService(false)
    };

    useEffect(() => {
        const canvas2 = document.getElementById('qrcodeCanvasThongTin') as HTMLCanvasElement;
        if (canvas2) {
            const ctx = canvas2.getContext('2d');

            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
                QrCode.toCanvas(canvas2, QrCodeServiceContext.urlQrView, {
                    width: 150,
                });

                const imageDataURL = canvas2.toDataURL('image/png');
                setSrcQrCodeThongTin(imageDataURL);
            }
        }
    }, [QrCodeServiceContext.urlQrView])


    return (
        <AntdModal title="Mã QR" visible={QrCodeServiceContext.viewQrCodeService} handlerCancel={handleCancel} footer={null}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{ display: 'none' }}>
                    <canvas id="qrcodeCanvasThongTin"></canvas>
                </div>
                {srcQrCodeThongTin && <img src={srcQrCodeThongTin} alt="QRcode" />}
            </div>
        </AntdModal>
    )
}