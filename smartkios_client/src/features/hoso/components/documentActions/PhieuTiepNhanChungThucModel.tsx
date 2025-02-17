import { AntdModal } from "@/lib/antd/components"
import { PhieuTiepNhanChungThuc } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanChungThuc/PhieuTiepNhanChungThuc"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuTiepNhanChungThucModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuTiepNhanChungThucModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuTiepNhanChungThucModalVisible){
            downloadPhieuPdf("Phiếu tiếp nhận chứng thực")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu tiếp nhận chứng thực"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuTiepNhanChungThuc/>
    </AntdModal>
}

export default PhieuTiepNhanChungThucModal