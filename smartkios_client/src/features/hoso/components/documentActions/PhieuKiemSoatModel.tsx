import { AntdModal } from "@/lib/antd/components"
import { PhieuKiemSoat } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuKiemSoat/PhieuKiemSoat"
import { PhieuKiemSoat_NinhThuan } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuKiemSoat/PhieuKiemSoat_NinhThuan"
import { PhieuKiemSoat_PhuYen } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuKiemSoat/PhieuKiemSoat_PhuYen"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { useAppSelector } from "@/lib/redux/Hooks";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord"

const PhieuKiemSoatModal = () => {
    const { publicModule: config } = useAppSelector(state => state.config)
    let getTinh
    config?.map(item => {
        if (item.code == "phieu-kiem-soat"){
            getTinh=item.content
        }
    })

    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuKiemSoatModalVisible(false)
    }
    const onOk = () => {
        if(buttonActionContext.inPhieuKiemSoatModalVisible){
            downloadPhieuWord("Phiếu kiểm soát")
        }
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu kiểm soát"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable>
         {getTinh === "NinhThuan"
            ? <PhieuKiemSoat_NinhThuan />
            : (
                getTinh === "PhuYen"
                    ? <PhieuKiemSoat_PhuYen/>
                    : <PhieuKiemSoat />
            )
        }

    </AntdModal>
}

export default PhieuKiemSoatModal