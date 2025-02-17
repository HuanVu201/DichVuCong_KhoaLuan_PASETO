import { AntdModal } from "@/lib/antd/components"
import { PhieuThuLePhi } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuThuLePhi/PhieuThuLePhi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuThuLePhiModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuThuLePhiModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuThuLePhiModalVisible){
            downloadPhieuPdf("Phiếu thu lệ phí")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu thu lệ phí"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuThuLePhi/>
    </AntdModal>
}

export default PhieuThuLePhiModal