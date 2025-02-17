import { AntdModal } from "@/lib/antd/components"
import { ThongKeDiaBan } from "@/pages/dvc/MauPhieu/documents/pdf/ThongKeDiaBan/ThongKeDiaBan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const ThongKeDiaBanModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInThongKeDiaBanModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inThongKeDiaBanModalVisible){
            downloadPhieuPdf("Thống kê địa bàn")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu thống kê địa bàn"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <ThongKeDiaBan/>
    </AntdModal>
}

export default ThongKeDiaBanModal