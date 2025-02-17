import { AntdModal } from "@/lib/antd/components"
import { DanhSachHoSoTrongKy } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachHoSoTrongKy/DanhSachHoSoTrongKy"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachHoSoTrongKyModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachHoSoTrongKyModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachHoSoTrongKyModalVisible){
            downloadPhieuPdf("Danh sách hồ sơ trong kỳ")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách hồ sơ trong kỳ"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachHoSoTrongKy/>
    </AntdModal>
}

export default DanhSachHoSoTrongKyModal