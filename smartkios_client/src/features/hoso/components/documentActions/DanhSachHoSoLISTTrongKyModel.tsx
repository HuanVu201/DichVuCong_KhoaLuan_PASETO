import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSoLISTTrongKy } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSoLISTTrongKy/DanhSachHoSoLISTTrongKy"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoLISTTrongKyModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoLISTTrongKyModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoLISTTrongKyModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ LIST trong kỳ")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ LIST trong kỳ"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSoLISTTrongKy/>
    </AntdModal>
}

export default DanhSachHoSoLISTTrongKyModal