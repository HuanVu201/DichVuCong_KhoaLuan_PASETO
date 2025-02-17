import { AntdModal } from "@/lib/antd/components"
import { BaoCao06a } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCao06a/BaoCao06a"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCao06aModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCao06aModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCao06aModalVisible){
            downloadPhieuPdf("Báo cáo 06a")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo 06a"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCao06a/>
    </AntdModal>
}

export default BaoCao06aModal