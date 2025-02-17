import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Input } from "antd";
import { useState } from "react";


export const DinhDanhOTP = ({onOk, onClose}: {onClose: () => void; onOk: (otp: string) => void}) => {
    const [text, setText] = useState("")
    const {loading} = useAppSelector(state => state.user)
    return <AntdModal title="Vui lòng nhập mã otp" maskClosable footer={null} closable visible handlerCancel={onClose}>
        <AntdSpace direction="vertical" style={{width:"100%"}}>
            <Input.OTP onChange={setText} length={6} style={{width:"100%"}}></Input.OTP>
            <AntdButton loading={loading} type="primary" block disabled={text.length != 6} onClick={() => {
                onClose();
                onOk(text)
            }}>
                Xác nhận
            </AntdButton>
        </AntdSpace>
    </AntdModal>
}