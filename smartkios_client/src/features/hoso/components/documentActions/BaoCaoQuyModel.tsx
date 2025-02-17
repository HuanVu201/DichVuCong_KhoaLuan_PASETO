import { AntdModal } from "@/lib/antd/components"
import { BaoCaoQuy } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoQuy/BaoCaoQuy"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoQuyModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoQuyModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoQuyModalVisible){
            downloadPhieuPdf("Báo cáo quý")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo quý"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoQuy/>
    </AntdModal>
}

export default BaoCaoQuyModal