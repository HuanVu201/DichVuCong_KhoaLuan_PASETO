import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSoLT } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSoLT/DanhSachHoSoLT"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoLTModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoLTModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoLTModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ LT")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ LT"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSoLT/>
    </AntdModal>
}

export default DanhSachHoSoLTModal