import { AntdModal } from "@/lib/antd/components"
import { ThongKeHoSoTiepNhanBuuChinh } from "@/pages/dvc/MauPhieu/documents/pdf/ThongKeHoSoTiepNhanBuuChinh/ThongKeHoSoTiepNhanBuuChinh"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuTiepNhanHoSoModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuTiepNhanHoSoModalVisible){
            downloadPhieuPdf("Thống kê hồ sơ tiếp nhận bưu chính")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu thống kê hồ sơ tiếp nhận bưu chính"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <ThongKeHoSoTiepNhanBuuChinh/>
    </AntdModal>
}

export default PhieuTiepNhanHoSoModal