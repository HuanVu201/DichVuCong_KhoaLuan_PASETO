import { AntdModal } from "@/lib/antd/components"
import { ThongKeThuTucPhatSinhHoSoBCCI } from "@/pages/dvc/MauPhieu/documents/pdf/ThongKeThuTucPhatSinhHoSoBCCI/ThongKeThuTucPhatSinhHoSoBCCI"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const ThongKeThuTucPhatSinhHoSoBCCIModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInThongKeThuTucPhatSinhHoSoBCCIModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inThongKeThuTucPhatSinhHoSoBCCIModalVisible){
            downloadPhieuPdf("Thống kê thủ tục phát sinh hồ sơ BCCI")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu thống kê thủ tục phát sinh hồ sơ BCCI"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <ThongKeThuTucPhatSinhHoSoBCCI/>
    </AntdModal>
}

export default ThongKeThuTucPhatSinhHoSoBCCIModal