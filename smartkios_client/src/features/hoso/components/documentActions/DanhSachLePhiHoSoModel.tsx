import { AntdModal } from "@/lib/antd/components"
import { DanhSachLePhiHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/DanhSachLePhiHoSo/DanhSachLePhiHoSo"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const DanhSachLePhiHoSoModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInDanhSachLePhiHoSoModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inDanhSachLePhiHoSoModalVisible){
            downloadPhieuPdf("Danh sách lệ phí hồ sơ")
        }
    }
    return <AntdModal okText="In danh sách" visible={true} title={"Danh sách lệ phí hồ sơ"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <DanhSachLePhiHoSo/>
    </AntdModal>
}

export default DanhSachLePhiHoSoModal