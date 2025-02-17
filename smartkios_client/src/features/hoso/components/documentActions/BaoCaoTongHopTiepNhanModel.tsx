import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTongHopTiepNhan } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTongHopTiepNhan/BaoCaoTongHopTiepNhan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTongHopTiepNhanModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTongHopTiepNhanModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTongHopTiepNhanModalVisible){
            downloadPhieuPdf("Báo cáo tổng hợp tiếp nhận")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo tổng hợp tiếp nhận"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTongHopTiepNhan/>
    </AntdModal>
}

export default BaoCaoTongHopTiepNhanModal