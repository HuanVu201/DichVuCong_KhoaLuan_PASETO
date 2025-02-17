import { AntdModal } from "@/lib/antd/components"
import { PhieuGopY } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuGopY/PhieuGopY"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuGopYModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuGopYModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuGopYModalVisible){
            downloadPhieuPdf("Phiếu góp ý")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu góp ý"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuGopY/>
    </AntdModal>
}

export default PhieuGopYModal