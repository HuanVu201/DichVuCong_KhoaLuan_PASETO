import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { PhieuTiepNhanHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { Button, Spin } from "antd";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { fillSoChungThuc, generateDocxWithImages } from "@/utils/common";
import { XuLyHoSoProvider, useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext";
import { MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA } from "@/pages/dvc/MauPhieu/documents/pdf";
import { btnSignClick } from "@/utils/common";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NGUOI_TIEP_NHAN_HO_SO } from "../../data/signData";
import { CURRENTTIME } from "@/data";
import { LoadingOutlined } from "@ant-design/icons";
import { saveAs } from 'file-saver'
import KyDienTuModal from "./KyDienTuModal";


const PhieuTiepNhanHoSoChungThucModalVisible = () => {
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
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

    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuTiepNhanChungThucModalVisible(false)
    }

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
        if (buttonActionContext.inPhieuTiepNhanHoSoModalVisible) {
            xuLyHoSoContext.setBase64ChuKyDienTu(xuLyHoSoContext.base64transparent)
            xuLyHoSoContext.handlerXuatLaiPhieu()
        }

    }

    const kySo = async () => {
        xuLyHoSoContext.handlerKySo(NGUOI_TIEP_NHAN_HO_SO);
    }
    const guiCongDan = async () => {
        xuLyHoSoContext.handlerGuiCongDan();
    }

    const xuatWord = async () => {
        xuLyHoSoContext.setXuatWord(true)
    }


    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu tiếp nhận hồ sơ và hẹn trả kết quả"} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[
            <Button
                type="primary"
                onClick={xuatWord} //In tương tự Window + P
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
            <Button
                type="primary"
                onClick={guiCongDan}
                disabled={xuLyHoSoContext.loading}
            >
                Gửi công dân
            </Button>,
            <Button key="back" onClick={handlerCancel}>
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyHoSoContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <PhieuTiepNhanHoSo loaiPhoi="phieu-tiep-nhan-ho-so-va-hen-tra-ket-qua-chung-thuc" />
            <p style={{ textAlign: 'right', color: 'tomato', position: 'relative', top : 30 }} hidden={!kyDienTuCongDan}>
                <i>Lưu ý: Thực hiện "Ký điện tử công dân" trước khi "Ký số" đối với hồ sơ trực tiếp!</i>
            </p>
            {xuLyHoSoContext.kyDienTuModalVisible ? <KyDienTuModal /> : null}

        </Spin>
    </AntdModal>
}
const PhieuTiepNhanHoSoModal = () => (
    <XuLyHoSoProvider>
        <PhieuTiepNhanHoSoChungThucModalVisible />
    </XuLyHoSoProvider>
);


export default PhieuTiepNhanHoSoModal