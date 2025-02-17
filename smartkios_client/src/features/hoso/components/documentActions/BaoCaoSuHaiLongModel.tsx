import { AntdModal } from "@/lib/antd/components"
import { BaoCaoSuHaiLong } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoSuHaiLong/BaoCaoSuHaiLong"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoSuHaiLongModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoSuHaiLongModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoSuHaiLongModalVisible){
            downloadPhieuPdf("Báo cáo sự hài lòng")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo sự hài lòng"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoSuHaiLong/>
    </AntdModal>
}

export default BaoCaoSuHaiLongModal