import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSo/DanhSachHoSo"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSo/>
    </AntdModal>
}

export default DanhSachHoSoModal