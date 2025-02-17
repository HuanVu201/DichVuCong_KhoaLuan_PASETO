import { ChiTietNguoiDung } from "@/features/user/components/ChiTietNguoiDung"
import { AntdModal } from "@/lib/antd/components"
import { FormInstance } from "antd"


export const ChiTietChuHoSoModal = ({visible, form, onClose} : {visible: boolean, onClose: () => void, form: FormInstance<ChiTietNguoiDung>}) => {
    return <AntdModal fullsizeScrollable title="THÔNG TIN CHI TIẾT CHỦ HỒ SƠ" visible={visible} footer={null} handlerCancel={onClose} bodyStyle={{padding: "20px 100px"}}>
        <ChiTietNguoiDung form={form}/>
    </AntdModal>
}