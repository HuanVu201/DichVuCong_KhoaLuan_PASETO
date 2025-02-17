import { AntdModal } from "@/lib/antd/components"
import { BaoCaoLoaiHinh } from "@/pages/dvc/MauPhieu/documents/pdf/BaoCaoLoaiHinh/BaoCaoLoaiHinh"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"

const BaoCaoLoaiHinhModal = () => {
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInBaoCaoLoaiHinhModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inBaoCaoLoaiHinhModalVisible){
            downloadPhieuPdf("Báo cáo loại hình")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu báo cáo loại hình"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
        <BaoCaoLoaiHinh/>
    </AntdModal>
}

export default BaoCaoLoaiHinhModal