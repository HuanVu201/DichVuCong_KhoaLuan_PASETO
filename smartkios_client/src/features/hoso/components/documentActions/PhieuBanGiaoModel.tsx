import { AntdModal } from "@/lib/antd/components"
import { PhieuBanGiao } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuBanGiao/PhieuBanGiao"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuBanGiaoModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuBanGiaoModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuBanGiaoModalVisible){
            downloadPhieuPdf("Phiếu bàn giao")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu bàn giao"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuBanGiao/>
    </AntdModal>
}

export default PhieuBanGiaoModal