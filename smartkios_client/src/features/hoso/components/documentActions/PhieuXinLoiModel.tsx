import { AntdModal } from "@/lib/antd/components"
import { PhieuXinLoi } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuXinLoi/PhieuXinLoi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuXinLoiModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuXinLoiModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuXinLoiModalVisible){
            downloadPhieuPdf("Phiếu xin lỗi")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu xin lỗi"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuXinLoi/>
    </AntdModal>
}

export default PhieuXinLoiModal