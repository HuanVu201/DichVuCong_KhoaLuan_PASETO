import { AntdModal } from "@/lib/antd/components"
import { PhieuTuChoi } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTuChoi/PhieuTuChoi"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { XuLyHoSoProvider, useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext"
import { Button, Spin } from "antd"
import axios from "axios"
import { btnSignClick } from "@/utils/common"
import { MA_PHIEU_TU_CHOI, TEN_PHIEU_TU_CHOI } from "@/pages/dvc/MauPhieu/documents/pdf"
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord"
import { useHuongDanNopHoSoContext } from "@/features/huongDanNopHoSo/contexts/HuongDanNopHoSoContext"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { NGUOI_HUONG_DAN, NGUOI_TU_CHOI } from "../../data/signData"
import { LoadingOutlined } from "@ant-design/icons"
import { saveAs } from 'file-saver'
import KyDienTuModal from "./KyDienTuModal"

const PhieuTuChoiModalVisible = () => {
    const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
    const xuLyHoSoContext = useXuLyHoSoContext()
    const handlerCancel = () => {
        // buttonActionContext.setSelectedHoSos([])
        huongDanNopHoSoContext.setXuatPhieuTuChoiModalVisible(false)
    }
    const { publicModule: config } = useAppSelector(state => state.config)
    const [xuatDocx, setXuatDocx] = useState<boolean>(false)
    const [kyDienTuCongDan, setKyDienTuCongDan] = useState<boolean>(false)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'xuat-docx' && item.content == '1')
                setXuatDocx(true)
            if (item.code == 'ky-dien-tu-cong-dan' && item.content == '1')
                setKyDienTuCongDan(true)
        })
    }, [config])


    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn Ctrl+P
                taiPhieu(); // Gọi hàm in PDF
            }
        };
        // Nghe sự kiện keydown trên cả trang web
        document.addEventListener('keydown', handleKeyPress);
        // Xóa bỏ sự kiện khi component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    const taiPhieu = async () => {
        const iframe: any = document.getElementById('iframePdf')
        if (iframe) {
            iframe.contentWindow.print(); // Gọi hàm in của iframe
        }
    }

    const xuatLaiPhieuAction = () => {
        if (huongDanNopHoSoContext.xuatPhieuTuChoiModalVisible) {
            xuLyHoSoContext.setBase64ChuKyDienTu(xuLyHoSoContext.base64transparent)
            xuLyHoSoContext.handlerXuatLaiPhieu()
        }

    }

    const kySo = async () => {
        xuLyHoSoContext.handlerKySo(NGUOI_TU_CHOI);
    }

    const xuatWord = async () => {
        xuLyHoSoContext.setXuatWord(true)
    }

    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu từ chối"} fullsizeScrollable
        handlerCancel={handlerCancel}
        footer={[
            <Button
                type="primary"
                onClick={xuatWord}
                hidden={!xuatDocx}
                disabled={xuLyHoSoContext.loading}
            >
                Xuất phiếu word
            </Button>,
            <Button
                type="primary"
                onClick={taiPhieu} //In tương tự Window + P
                disabled={xuLyHoSoContext.loading}
            >
                In phiếu
            </Button>,
            <Button
                type="primary"
                onClick={xuatLaiPhieuAction}
                disabled={xuLyHoSoContext.loading}
            >
                Xuất lại phiếu
            </Button>,
            <Button
                type="primary"
                hidden={!kyDienTuCongDan}
                onClick={() => xuLyHoSoContext.setKyDienTuModalVisible(true)}
                disabled={xuLyHoSoContext.loading}
            >
                Ký điện tử công dân
            </Button>,
            <Button
                type="primary"
                onClick={kySo}
                disabled={xuLyHoSoContext.loading}
            >
                Ký số
            </Button>,
            // <Button
            //     type="primary"
            // >
            //     Gửi công dân
            // </Button>,
            <Button key="back"
                onClick={handlerCancel}
            >
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyHoSoContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <PhieuTuChoi />
            <p style={{ textAlign: 'right', color: 'tomato', position: 'relative', top : 30 }} hidden={!kyDienTuCongDan}>
                <i>Lưu ý: Thực hiện "Ký điện tử công dân" trước khi "Ký số" đối với hồ sơ trực tiếp!</i>
            </p>
            {xuLyHoSoContext.kyDienTuModalVisible ? <KyDienTuModal /> : null}
        </Spin>
    </AntdModal>
}

const PhieuTuChoiModal = () => (
    <XuLyHoSoProvider>
        <PhieuTuChoiModalVisible />
    </XuLyHoSoProvider>
);

export default PhieuTuChoiModal