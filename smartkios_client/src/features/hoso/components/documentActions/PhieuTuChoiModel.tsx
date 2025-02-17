import { AntdModal } from "@/lib/antd/components"
import { PhieuTuChoi } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTuChoi/PhieuTuChoi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuTuChoiModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuTuChoiModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuTuChoiModalVisible){
            downloadPhieuPdf("Phiếu từ chối")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu từ chối"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuTuChoi/>
    </AntdModal>
}

export default PhieuTuChoiModal