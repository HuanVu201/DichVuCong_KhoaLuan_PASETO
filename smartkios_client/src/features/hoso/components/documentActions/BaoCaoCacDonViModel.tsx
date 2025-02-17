import { AntdModal } from "@/lib/antd/components"
import { BaoCaoCacDonVi } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoCacDonVi/BaoCaoCacDonVi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoCacDonViModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoCacDonViModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoCacDonViModalVisible){
            downloadPhieuPdf("Báo cáo các đơn vị")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo các đơn vị"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoCacDonVi/>
    </AntdModal>
}

export default BaoCaoCacDonViModal