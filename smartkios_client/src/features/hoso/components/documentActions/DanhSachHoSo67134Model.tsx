import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSo67134 } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSo67134/DanhSachHoSo67134"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSo67134Modal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSo67134ModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSo67134ModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ 67134")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ 67134"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSo67134/>
    </AntdModal>
}

export default DanhSachHoSo67134Modal