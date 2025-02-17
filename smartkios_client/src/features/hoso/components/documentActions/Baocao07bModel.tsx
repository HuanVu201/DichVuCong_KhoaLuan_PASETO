import { AntdModal } from "@/lib/antd/components"
import { BaoCao07b } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCao07b/BaoCao07b"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCao07bModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCao07bModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCao07bModalVisible){
            downloadPhieuPdf("Báo cáo 07b")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo 07b"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCao07b/>
    </AntdModal>
}

export default BaoCao07bModal