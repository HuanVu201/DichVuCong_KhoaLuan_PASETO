import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSoChung } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSoChung/DanhSachHoSoChung"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoChungModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoChungModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoChungModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ chung")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ chung"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSoChung/>
    </AntdModal>
}

export default DanhSachHoSoChungModal