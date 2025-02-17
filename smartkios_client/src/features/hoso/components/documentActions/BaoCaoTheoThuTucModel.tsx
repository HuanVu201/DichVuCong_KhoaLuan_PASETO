import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTheoThuTuc } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTheoThuTuc/BaoCaoTheoThuTuc"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTheoThuTucModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTheoThuTucModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTheoThuTucModalVisible){
            downloadPhieuPdf("Báo cáo theo thủ tục")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo theo thủ tục"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTheoThuTuc/>
    </AntdModal>
}

export default BaoCaoTheoThuTucModal