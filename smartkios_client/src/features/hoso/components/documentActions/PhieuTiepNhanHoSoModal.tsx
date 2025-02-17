import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { PhieuTiepNhanHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo"
import { PhieuTiepNhanHoSo_NinhThuan } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo_NinhThuan"
import { PhieuTiepNhanHoSo_PhuYen } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo_PhuYen"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { Button } from "antd";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";

const PhieuTiepNhanHoSoModal = () => {
    const { publicModule: config } = useAppSelector(state => state.config)
    let getTinh
    config?.map((item: any) => {
        if (item.code == "phieu-tiep-nhan-ho-so") {
            getTinh = item.content
        }
    })
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(false)
    }
    const taiPhieu = () => {
        if (buttonActionContext.inPhieuTiepNhanHoSoModalVisible) {
            downloadPhieuWord("Phiếu tiếp nhận hồ sơ")
        }
    }

    const inPhieu = () => {

        window.print()
    }
    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu tiếp nhận hồ sơ và hẹn trả kết quả"} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[
            <Button key="back" onClick={handlerCancel}>
                Hủy
            </Button>,
            <Button
                type="primary"
                onClick={taiPhieu}
            >
                Tải phiếu
            </Button>,
            // <Button
            //     type="primary"
            //     onClick={inPhieu}
            // >
            //     In phiếu
            // </Button>,
        ]}
    >

        {getTinh === "NinhThuan"
            ? <PhieuTiepNhanHoSo_NinhThuan />
            : (
                getTinh === "PhuYen"
                    ? <PhieuTiepNhanHoSo_PhuYen/>
                    : <PhieuTiepNhanHoSo />
            )
        }
    </AntdModal>
}

export default PhieuTiepNhanHoSoModal