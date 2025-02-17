import { AntdModal } from "@/lib/antd/components"
import { GiayPhepKinhDoanh } from "@/pages/dvc/MauPhieu/documents/pdf/GiayPhepKinhDoanh/GiayPhepKinhDoanh"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const GiayPhepKinhDoanhModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInGiayPhepKinhDoanhModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inGiayPhepKinhDoanhModalVisible){
            downloadPhieuPdf("Giấy phép kinh doanh")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Giấy phép kinh doanh"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <GiayPhepKinhDoanh/>
    </AntdModal>
}

export default GiayPhepKinhDoanhModal