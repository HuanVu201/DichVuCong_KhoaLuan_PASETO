import { AntdModal } from "@/lib/antd/components"
import { PhieuHuongDan } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuHuongDan/PhieuHuongDan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuHuongDanModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuHuongDanModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuHuongDanModalVisible){
            downloadPhieuPdf("Phiếu hướng dẫn")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu hướng dẫn"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuHuongDan/>
    </AntdModal>
}

export default PhieuHuongDanModal