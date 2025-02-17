import { AntdModal } from "@/lib/antd/components"
import { BaoCaoCacDonViChiTiet } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoCacDonViChiTiet/BaoCaoCacDonViChiTiet"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoCacDonViChiTietModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoCacDonViChiTietModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoCacDonViChiTietModalVisible){
            downloadPhieuPdf("Báo cáo các đơn vị chi tiết")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo các đơn vị chi tiết"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoCacDonViChiTiet/>
    </AntdModal>
}

export default BaoCaoCacDonViChiTietModal