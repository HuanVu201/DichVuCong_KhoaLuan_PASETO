import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { PhieuTiepNhanHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { Button, Spin } from "antd";
import { fillSoChungThuc, generateDocxWithImages } from "@/utils/common";
import { XuLyHoSoProvider, useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext";
import { MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA } from "@/pages/dvc/MauPhieu/documents/pdf";
import { btnSignClick } from "@/utils/common";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CURRENTTIME } from "@/data";
import { LoadingOutlined } from "@ant-design/icons";
import { saveAs } from 'file-saver'
import { QuaTrinhXuLyHoSoPdf } from "./QuaTrinhXuLyHoSoPdf";


const XuatQuaTrinhXuLyHoSoModalVisible = () => {
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const { data: hoSo } = useAppSelector(state => state.hoso)


    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setXuatQuaTrinhXuLyHoSoModalVisible(false)
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



    return <AntdModal visible={true} title={`Quá trình xử lý hồ sơ: ${hoSo?.maHoSo} (${hoSo?.chuHoSo})`} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[
            <Button
                type="primary"
                onClick={taiPhieu} //In tương tự Window + P
                disabled={xuLyHoSoContext.loading}
            >
                In phiếu
            </Button>,
            <Button key="back" onClick={handlerCancel} >
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyHoSoContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <QuaTrinhXuLyHoSoPdf />
        </Spin>
    </AntdModal>
}
const XuatQuaTrinhXuLyHoSoModal = () => (
    <XuLyHoSoProvider>
        <XuatQuaTrinhXuLyHoSoModalVisible />
    </XuLyHoSoProvider>
);


export default XuatQuaTrinhXuLyHoSoModal