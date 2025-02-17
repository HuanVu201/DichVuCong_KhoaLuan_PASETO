import { AntdModal } from "@/lib/antd/components"
import { BaoCaoXuLyLinhVuc } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoXuLyLinhVuc/BaoCaoXuLyLinhVuc"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoXuLyLinhVucModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoXuLyLinhVucModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoXuLyLinhVucModalVisible){
            downloadPhieuPdf("Báo cáo xử lý lĩnh vực")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo xử lý lĩnh vực"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoXuLyLinhVuc/>
    </AntdModal>
}

export default BaoCaoXuLyLinhVucModal