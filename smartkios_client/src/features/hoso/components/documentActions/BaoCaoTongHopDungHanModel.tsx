import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTongHopDungHan } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTongHopDungHan/BaoCaoTongHopDungHan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTongHopDungHanModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTongHopDungHanModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTongHopDungHanModalVisible){
            downloadPhieuPdf("Báo cáo tổng hợp đúng hạn")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo tổng hợp đúng hạn"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTongHopDungHan/>
    </AntdModal>
}

export default BaoCaoTongHopDungHanModal