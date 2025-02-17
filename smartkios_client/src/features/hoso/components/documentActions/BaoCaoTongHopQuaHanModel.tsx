import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTongHopQuaHan } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTongHopQuaHan/BaoCaoTongHopQuaHan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTongHopQuaHanModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTongHopQuaHanModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTongHopQuaHanModalVisible){
            downloadPhieuPdf("Báo cáo tổng hợp quá hạn")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo tổng hợp quá hạn"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTongHopQuaHan/>
    </AntdModal>
}

export default BaoCaoTongHopQuaHanModal