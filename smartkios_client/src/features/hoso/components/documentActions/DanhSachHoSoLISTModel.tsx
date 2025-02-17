import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSoLIST } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSoLIST/DanhSachHoSoLIST"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoLISTModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoLISTModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoLISTModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ LIST")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ LIST"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSoLIST/>
    </AntdModal>
}

export default DanhSachHoSoLISTModal