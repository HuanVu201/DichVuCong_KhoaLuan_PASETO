import { AntdModal } from "@/lib/antd/components"
import { PhieuKiemSoat } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuKiemSoat/PhieuKiemSoat"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { useAppSelector } from "@/lib/redux/Hooks";
import { XuLyHoSoProvider, useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext"
import { Button, Spin } from "antd"
import { btnSignClick } from "@/utils/common"
import axios from "axios"
import { MA_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO, TEN_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO } from "@/pages/dvc/MauPhieu/documents/pdf"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { saveAs } from 'file-saver'

const PhieuKiemSoatModalVisible = () => {

    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [xuatDocx, setXuatDocx] = useState<boolean>(false)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'xuat-docx' && item.content == '1')
                setXuatDocx(true)
        })
    }, [config])


    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setInPhieuKiemSoatModalVisible(false)
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
        else {
            toast('none')
        }
    }

    const xuatLaiPhieuAction = () => {
        if (buttonActionContext.inPhieuKiemSoatModalVisible) {
            xuLyHoSoContext.setLoading(true)
            xuLyHoSoContext.handlerXuatLaiPhieu()
        }

    }

    const kySo = async () => {
        xuLyHoSoContext.handlerKySo("");
    }

    const xuatWord = async () => {
        xuLyHoSoContext.setXuatWord(true)
    }


    return <AntdModal okText="Tải phiếu" visible={true} title={"Phiếu kiểm soát quá trình giải quyết hồ sơ"} fullsizeScrollable handlerCancel={handlerCancel}
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
            // <Button
            //     type="primary"
            // // onClick={taiPhieu}
            // >
            //     Ký điện tử công dân
            // </Button>,
            <Button
                type="primary"
                onClick={kySo}
                disabled={xuLyHoSoContext.loading}
            >
                Ký số
            </Button>,
            <Button key="back" onClick={handlerCancel}>
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyHoSoContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <PhieuKiemSoat />
        </Spin>
    </AntdModal>
}

const PhieuKiemSoatModal = () => (
    <XuLyHoSoProvider>
        <PhieuKiemSoatModalVisible />
    </XuLyHoSoProvider>
);

export default PhieuKiemSoatModal