import { AntdModal } from "@/lib/antd/components"
import { PhieuHuongDan } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuHuongDan/PhieuHuongDan"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { Button, Spin } from "antd"
import { btnSignClick } from "@/utils/common"
import axios from "axios"
import { MA_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO, TEN_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO } from "@/pages/dvc/MauPhieu/documents/pdf"
import { XuLyHoSoProvider, useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext"
import { useHuongDanNopHoSoContext } from "@/features/huongDanNopHoSo/contexts/HuongDanNopHoSoContext"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/redux/Hooks"
import { toast } from "react-toastify"
import { NGUOI_HUONG_DAN } from "../../data/signData"
import { LoadingOutlined } from "@ant-design/icons"
import { saveAs } from 'file-saver'

const PhieuHuongDanModalVisible = () => {
    const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
    const xuLyHoSoContext = useXuLyHoSoContext()
    const handlerCancel = () => {
        // buttonActionContext.setSelectedHoSos([])
        huongDanNopHoSoContext.setXuatPhieuHuongDanNopHoSoModalVisible(false)
    }
    const { publicModule: config } = useAppSelector(state => state.config)
    const [xuatDocx, setXuatDocx] = useState<boolean>(false)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'xuat-docx' && item.content == '1')
                setXuatDocx(true)
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
        if (huongDanNopHoSoContext.xuatPhieuHuongDanNopHoSoModalVisible) {
            xuLyHoSoContext.setLoading(true)
            xuLyHoSoContext.handlerXuatLaiPhieu()
        }

    }

    const kySo = async () => {
        xuLyHoSoContext.handlerKySo(NGUOI_HUONG_DAN);
    }

    const xuatWord = async () => {
        xuLyHoSoContext.setXuatWord(true)
    }


    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu hướng dẫn hoàn thiện hồ sơ"} fullsizeScrollable
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
            <PhieuHuongDan />
        </Spin>
    </AntdModal>
}


const PhieuHuongDanModal = () => (
    <XuLyHoSoProvider>
        <PhieuHuongDanModalVisible />
    </XuLyHoSoProvider>
);


export default PhieuHuongDanModal