import { AntdModal } from "@/lib/antd/components"
import { QuaTrinhXuLy } from "@/pages/dvc/MauPhieu/documents/pdf/QuaTrinhXuLy/QuaTrinhXuLy"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const QuaTrinhXuLyModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInQuaTrinhXuLyModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inQuaTrinhXuLyModalVisible){
            downloadPhieuPdf("Quá trình xử lý")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Quá trình xử lý"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <QuaTrinhXuLy/>
    </AntdModal>
}

export default QuaTrinhXuLyModal