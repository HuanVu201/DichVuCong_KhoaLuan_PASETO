import { AntdModal } from "@/lib/antd/components"
import { GiayCNDKKinhDoanh } from "@/pages/dvc/MauPhieu/documents/pdf/GiayCNDKKinhDoanh/GiayCNDKKinhDoanh"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const GiayCNDKKinhDoanhModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInGiayCNDKKinhDoanhModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inGiayCNDKKinhDoanhModalVisible){
            downloadPhieuPdf("Giấy CNĐK kinh doanh")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Giấy chứng nhận đăng ký kinh doanh"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <GiayCNDKKinhDoanh/>
    </AntdModal>
}

export default GiayCNDKKinhDoanhModal