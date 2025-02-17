import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTiepNhanTheoDoi } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTiepNhanTheoDoi/BaoCaoTiepNhanTheoDoi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTiepNhanTheoDoiModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTiepNhanTheoDoiModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTiepNhanTheoDoiModalVisible){
            downloadPhieuPdf("Báo cáo tiếp nhận theo dõi")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo tiếp nhận theo dõi"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTiepNhanTheoDoi/>
    </AntdModal>
}

export default BaoCaoTiepNhanTheoDoiModal