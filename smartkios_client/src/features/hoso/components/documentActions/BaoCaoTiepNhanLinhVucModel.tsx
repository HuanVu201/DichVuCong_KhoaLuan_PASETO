import { AntdModal } from "@/lib/antd/components"
import { BaoCaoTiepNhanLinhVuc } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoTiepNhanLinhVuc/BaoCaoTiepNhanLinhVuc"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoTiepNhanLinhVucModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoTiepNhanLinhVucModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoTiepNhanLinhVucModalVisible){
            downloadPhieuPdf("Báo cáo tiếp nhận lĩnh vực")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo tiếp nhận lĩnh vực"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoTiepNhanLinhVuc/>
    </AntdModal>
}

export default BaoCaoTiepNhanLinhVucModal