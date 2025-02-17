import { AntdModal } from "@/lib/antd/components"
import { PhieuBienNhanKetQua } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuBienNhanKetQua/PhieuBienNhanKetQua"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const PhieuBienNhanKetQuaModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuBienNhanKetQuaModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuBienNhanKetQuaModalVisible){
            downloadPhieuPdf("Phiếu biên nhận kết quả")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu biên nhận kết quả"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <PhieuBienNhanKetQua/>
    </AntdModal>
}

export default PhieuBienNhanKetQuaModal